import axios from "axios";
import Constant from "./helper/constant";

export default function CreateSezzleCheckout(req, res) {
  if (req.method === "POST") {
    const graphqlQuery = {
      operationName: "createSezzleCheckout",
      query: `mutation CreateSezzleCheckout ($cart_id: String!, $updated_cart: Boolean){
        createSezzleCheckout(input: { cart_id: $cart_id, updated_cart: $updated_cart }) {
          checkout_url
          success
        }
      }`,
      variables: {
        cart_id: req.body.cartId,
        updated_cart: req.body.updatedCart,
      },
    };

    axios
      .post(Constant.magentoGraphQLEndpoint, graphqlQuery, {
        "content-type": "application/json",
        headers: {
          Authorization: req.headers.authorization,
        },
      })
      .then((response) => {
        if (response?.data) {
          res.status(200).json(response.data);
        } else if (response?.data?.errors) {
          res.status(200).json({ error: response.data.errors });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(401).json({ status: "Unauthorized access" });
  }
}
