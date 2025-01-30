export const checkoutShippingAddress = (state = {}, action) => {
  switch (action.type) {
    case "SET_CHECKOUT_SHIPPING_ADDRESS":
      return action.val;
    default:
      return state;
  }
};

export const checkoutShippingMethod = (state = {}, action) => {
  switch (action.type) {
    case "SET_CHECKOUT_SHIPPING_METHOD":
      return action.val;
    default:
      return state;
  }
};

export const checkoutPaymentMethod = (state = "", action) => {
  switch (action.type) {
    case "SET_CHECKOUT_PAYMENT_METHOD":
      return action.val;
    default:
      return state;
  }
};

export const checkoutBillingAddress = (state = {}, action) => {
  switch (action.type) {
    case "SET_CHECKOUT_BILLING_ADDRESS":
      return action.val;
    default:
      return state;
  }
};

export const availableShippingMethods = (state = [], action) => {
  switch (action.type) {
    case "SET_AVAILABLE_SHIPPING_METHODS":
      return action.val;
    default:
      return state;
  }
};

export const availablePaymentMethods = (state = [], action) => {
  switch (action.type) {
    case "SET_AVAILABLE_PAYMENT_METHODS":
      return action.val;
    default:
      return state;
  }
};

export const checkoutEmail = (state = "", action) => {
  switch (action.type) {
    case "SET_CHECKOUT_EMAIL":
      return action.val;
    default:
      return state;
  }
};

export const paymentDetails = (state = {}, action) => {
  switch (action.type) {
    case "SET_PAYMENT_DETAILS":
      return action.val;
    default:
      return state;
  }
};

export const isShippingAddressVerified = (state = false, action) => {
  switch (action.type) {
    case "SET_IS_SHIPPING_ADDRESS_VERIFIED":
      return action.val;
    default:
      return state;
  }
};

export const verifiedAddressArr = (state = [], action) => {
  switch (action.type) {
    case "SET_VERIFIED_ADDRESS_ARR":
      return action.val;
    default:
      return state;
  }
};

export const checkoutErrorMessage = (state = "", action) => {
  switch (action.type) {
    case "SET_CHECKOUT_ERROR":
      return action.val;
    default:
      return state;
  }
};

export const loading = (state = false, action) => {
  switch (action.type) {
    case "LOADING":
      return action.val;
    default:
      return state;
  }
};

export const sezzleUrl = (state = {}, action) => {
  switch (action.type) {
    case "SET_SEZZLE_URL":
      return action.val;
    default:
      return state;
  }
};
