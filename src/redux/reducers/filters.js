const lastSelectedFilter = (state = "", action) => {
  switch (action.type) {
    case "SET_LAST_SELECTED_FILTER":
      return action.val;
    default:
      return state;
  }
};

export const plpListing = (state = "", action) => {
  switch (action.type) {
    case "SET_PLP_DATA":
      return action.val;
    default:
      return state;
  }
};

export default lastSelectedFilter;
