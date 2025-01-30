export const shippingTrackingDetails = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_SHIPPING_TRACKING_DETAILS":
      return action.val;
    default:
      return state;
  }
};
