export const categories = (
  state = {
    categories: [],
  },
  action
) => {
  switch (action.type) {
    case "GET_CATEGORIES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_CATEGORIES_SUCCESS":
      return {
        loading: false,
        categories: action.payload,
      };
    case "GET_CATEGORIES_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
