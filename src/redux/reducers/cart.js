export const customerCartId = (state = "", action) => {
  switch (action.type) {
    case "CUSTOMER_CART_ID":
      return action.val;
    default:
      return state;
  }
};

export const guestCartId = (state = "", action) => {
  switch (action.type) {
    case "GUEST_CART_ID":
      return action.val;
    default:
      return state;
  }
};

export const cartItems = (state = [], action) => {
  switch (action.type) {
    case "CART_ITEMS":
      return action.val;
    default:
      return state;
  }
};

export const displayCart = (state = false, action) => {
  switch (action.type) {
    case "DISPLAY_CART": {
      return action.val;
    }
    default:
      return state;
  }
};

export const cartDetails = (state = {}, action) => {
  switch (action.type) {
    case "CART_DETAILS":
      return action.val;
    default:
      return state;
  }
};

export const isCouponApplied = (state = false, action) => {
  switch (action.type) {
    case "SET_COUPON":
      return action.val;
    default:
      return state;
  }
};

export const storeCredit = (state = {}, action) => {
  switch (action.type) {
    case "SET_STORE_CREDIT":
      return action.val;
    default:
      return state;
  }
};

export const estimateShipping = (state = {}, action) => {
  switch (action.type) {
    case "SET_ESTIMATE_SHIPPING":
      return action.val;
    default:
      return state;
  }
};

export const routeShippingValue = (state = "", action) => {
  switch (action.type) {
    case "SET_ROUTE_SHIPPING_VALUE":
      return action.val;
    default:
      return state;
  }
};

export const selectedState = (state = {}, action) => {
  switch (action.type) {
    case "SET_SELECTED_STATE":
      return action.val;
    default:
      return state;
  }
};

//CART MODULE

export const setSuccess = (state = "", action) => {
  switch (action.type) {
    case "SET_SUCCESS": {
      return action.val;
    }
    default:
      return state;
  }
};

//wishlist

export const setWishlistSuccess = (state = {}, action) => {
  switch (action.type) {
    case "SET_WISHLIST_SUCCESS":
      return action.val;
    default:
      return state;
  }
};

// wishlist Error
export const setWishlistError = (state = [], action) => {
  switch (action.type) {
    case "SET_WISHLIST_ERROR":
      return action.val;
    default:
      return state;
  }
};

// wishlist warning
export const setWishlistWarning = (state = "", action) => {
  switch (action.type) {
    case "SET_WISHLIST_WARNING":
      return action.val;
    default:
      return state;
  }
};

// Cart success message

export const setCartSuccess = (state = {}, action) => {
  switch (action.type) {
    case "SET_CART_SUCCESS":
      return action.val;
    default:
      return state;
  }
};

export const setError = (state = [], action) => {
  switch (action.type) {
    case "SET_ERROR":
      return action.val;
    default:
      return state;
  }
};
