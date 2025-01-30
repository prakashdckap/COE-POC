export const megaMenu = (state = {}, action) => {
  switch (action.type) {
    case "SET_MEGA_MENU":
      return action.val;
    default:
      return state;
  }
};

export const brandName = (state = {}, action) => {
  switch (action.type) {
    case "SET_BRAND_NAME":
      return action.val;
    default:
      return state;
  }
};

export const offerNotification = (state = [], action) => {
  switch (action.type) {
    case "SET_OFFER_NOTIFICATION":
      return action.val;
    default:
      return state;
  }
};

export const featureBrand = (state = {}, action) => {
  switch (action.type) {
    case "SET_FEATURE_BRAND":
      return action.val;
    default:
      return state;
  }
};

// promo banner
export const topPromoBanner = (state = [], action) => {
  switch (action.type) {
    case "SET_TOP_PROMO_BANNER":
      return action.val;
    default:
      return state;
  }
};

export const onpagetopPromoBanner = (state = [], action) => {
  switch (action.type) {
    case "SET_ON_PAGE_TOP_PROMO_BANNER":
      return action.val;
    default:
      return state;
  }
};

// login attempts
// Define your initial state
const initialState = 0;

export const setLoginAttempts = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN_ATTEMPTS":
      console.log("action", action, state);

      if (action.val === 0) {
        // Reset state to 0

        return initialState;
      } else {
        // Increment state by 1
        return state + 1;
      }
    default:
      return state;
  }
};
