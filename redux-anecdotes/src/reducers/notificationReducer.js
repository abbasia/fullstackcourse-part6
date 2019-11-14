const initialState = { message: null };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_MESSAGE": {
      return { message: action.data };
    }

    default:
      break;
  }
  return state;
};
export default reducer;

export const setNotification = (message, duration) => {
  return dispatch => {
    dispatch({ type: "NEW_MESSAGE", data: message });
    setTimeout(() => {
      dispatch({ type: "NEW_MESSAGE", data: null });
    }, duration * 1000);
  };
};
