const initialState = "";
const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER": {
      return action.filter;
    }

    default:
      break;
  }
  return state;
};
export default filterReducer;

export const setFilter = filter => {
  return { type: "SET_FILTER", filter };
};
