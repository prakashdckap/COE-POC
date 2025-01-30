const notification = (state = {}, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.val;
    default:
      return state;
  }
};

export default notification;
