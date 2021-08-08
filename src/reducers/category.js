const initialState = {
  categories: [],
  category: {},
  loading: false,
  error: null,
};

export const categories = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORY_REQUEST":
    case "GET_CATEGORIES_REQUEST":
    case "UPDATE_CATEGORY_REQUEST":
      return {
        ...state,
        error: null,
        loading: true,
      };
    case "GET_CATEGORIES_SUCCESS":
      return {
        loading: false,
        categories: action.payload,
      };
    case "GET_CATEGORY_SUCCESS":
      return {
        ...state,
        loading: false,
        category: action.payload,
      };
    case "GET_CATEGORY_FAILED":
    case "GET_CATEGORIES_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
