export const customerToken = (state = "", action) => {
  switch (action.type) {
    case "CUSTOMER_TOKEN":
      return action.val;
    default:
      return state;
  }
};

export const customerDetails = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_CUSTOMER_DETAILS":
      return action.val;
    default:
      return state;
  }
};

export const legalPopupStatus = (state = true, action) => {
  switch (action.type) {
    case "LEGAL_POPUP_STATUS":
      return action.val;
    default:
      return state;
  }
};

export const customerAddressList = (state = [], action) => {
  switch (action.type) {
    case "SET_CUSTOMER_ADDRESS_LIST":
      return action.val;
    default:
      return state;
  }
};

export const ageVerificationDetails = (state = {}, action) => {
  switch (action.type) {
    case "SET_AGE_VERIFICATION_DETAILS":
      return action.val;
    default:
      return state;
  }
};

export const newsletterSubcription = (state = false, action) => {
  switch (action.type) {
    case "SET_NEWSLETTER_SUBSCRIPTION":
      return action.val;
    default:
      return state;
  }
};

export const referralSubscription = (state = false, action) => {
  switch (action.type) {
    case "SET_REFERRAL_SUBSCRIPTION":
      return action.val;
    default:
      return state;
  }
};

export const orderDetail = (state = {}, action) => {
  switch (action.type) {
    case "SET_ORDER_DETAIL":
      return action.val;
    default:
      return state;
  }
};

export const sessionTimeout = (state = false, action) => {
  switch (action.type) {
    case "SET_SESSION_TIMEOUT":
      return action.val;
    default:
      return state;
  }
};

export const availableRewardPoints = (state = 0, action) => {
  switch (action.type) {
    case "SET_AVAILABLE_REWARD_POINTS":
      return action.val;
    default:
      return state;
  }
};

export const showUser = (state = false, action) => {
  switch (action.type) {
    case "SHOW_USER": {
      return action.val;
    }
    default:
      return state;
  }
};
