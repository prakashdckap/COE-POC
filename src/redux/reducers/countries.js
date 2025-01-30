const countries = (state = [], action) => {
  switch (action.type) {
    case "GET_COUNTRIES_LIST":
      return action.val;
    default:
      return state;
  }
};

export default countries;
