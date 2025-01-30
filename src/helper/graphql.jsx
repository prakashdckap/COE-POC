import { ApolloClient, ApolloLink, InMemoryCache, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

import { SET_CHECKOUT_ERROR, SET_NOTIFICATION } from "../redux/actions";
import store from "../redux/store";
import constants from "./constant";
import { performLogout } from "../utils/logout";

// HTTP link to connect graphql with backend
const nodeHttpLink = new HttpLink({
  uri: constants.nodeUrl,
});
const magentHttpLink = new HttpLink({
  uri: constants.magnetoEndPointUrl,
});
const adobeHttpLink = new HttpLink({
  uri: constants.adobeEndPointUrl,
});

// Adding Default header for all graphql requests
const authMiddleware = new ApolloLink((operation, forward) => {
  const { customerToken } = store.getState();
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: customerToken ? `Bearer ${customerToken}` : null,
      "Content-Type": "application/json",
    },
  }));

  return forward(operation);
});

const adobeAuth = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "Content-Type": "application/json",
      "Magento-Environment-Id": constants.magentoEnvId,
      "Magento-Store-Code": "main_website_store",
      "Magento-Store-view-Code": "default",
      "Magento-Website-Code": "base",
      "X-Api-Key": constants.magentoApiKey,
    },
  }));

  return forward(operation);
});

// Handling error for all graphql requests
const errorLink = onError(({ graphQLErrors, networkError, response, operation }) => {
  if (graphQLErrors) {
    graphQLErrors?.map(({ message, path }) => {
      if (restrictErrorMessages(message, path)) {
        let pathName = window.location.pathname;
        const isCheckout = pathName === "/checkout";
        message = errorMessageReplace(message, isCheckout);
        if (typeof message === "object" && message.localRules && isCheckout) {
          store.dispatch(SET_CHECKOUT_ERROR(message));
        } else {
          store.dispatch(
            SET_NOTIFICATION({
              status: true,
              message: message,
              type: "Warning",
            })
          );
        }
      }
    });
  }
  if (networkError && typeof networkError !== "object") {
    store.dispatch(
      SET_NOTIFICATION({
        status: true,
        message: networkError,
        type: "Warning",
      })
    );
  }
  console.log("networkError", networkError);

  if (operation.operationName === "IgnoreErrorsQuery") {
    response.errors = null;
  }
});

// Graphql client setup
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.split(
    (operation) => operation.getContext().endpoint === "magento",
    from([errorLink, authMiddleware, magentHttpLink]),
    from([errorLink, authMiddleware, nodeHttpLink]),
    from([errorLink, adobeAuth, adobeHttpLink])
  ),
  defaultOptions: {
    mutate: { errorPolicy: "all" },
  },
});

export const magnetoClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, authMiddleware, magentHttpLink]),
  defaultOptions: {
    mutate: { errorPolicy: "all" },
  },
});

export const adobeClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, adobeAuth, adobeHttpLink]),
  defaultOptions: {
    mutate: { errorPolicy: "all" },
  },
});

const errorMessageReplace = (message, isCheckout) => {
  console.log("ErrorMessage:", message);
  try {
    if (message) {
      if (
        message.includes("The current customer isn't authorized.") ||
        message?.toLowerCase()?.match("the current customer is not authorized") ||
        message?.toLowerCase()?.match("the current user cannot perform operations on cart")
      ) {
        return performLogout(); // Call the logout function
      }

      if (message.match("Unable to Place order: Authorize Net CIM Gateway")) {
        if (message.match("more than 10 payment profiles")) {
          return `There’s an issue with your payment profile. Please contact our support team, and we’ll be happy to assist you.`;
        } else {
          return "Transaction failed. This transaction has been declined. Please contact our support team for further assistance.";
        }
      } else if (message.match(`"CartId" is not allowed to be empty`)) {
        return "Session Timeout, Login again.";
      } else if (message.match(`Internal server error`)) {
        return "Something went wrong! please try again.";
      } else if (message.includes("cart ID")) {
        return "Something went wrong! please try again.";
      } else if (/CartId/.test(message)) {
        return "Something went wrong! please try again.";
      } else if (message.match(`Some of the products are out of stock`)) {
        return "The requested qty is not available.";
      } else if (message.includes("region_id is required")) {
        return "Something went wrong! please try again.";
      } else if (message.includes("503") || message.includes("Error")) {
        return "Something went wrong! please try again.";
      } else if (/WishlistId/.test(message) || /undefined/.test(message)) {
        return "Something went wrong! Please try again.";
      } else if (isCheckout) {
        if (message.includes("Due to the state rules and regulations")) {
          return { localRules: message };
        } else {
          return { localRules: message, title: true };
        }
      }
      return message;
    }
  } catch {
    return message;
  }
};

const restrictErrorMessages = (message, path) => {
  if (
    message &&
    typeof message !== "object" &&
    path &&
    path?.[0] !== "placeOrder" &&
    path?.[0] !== "applyCouponOnCart"
  ) {
    return true;
  }
};

export default client;
