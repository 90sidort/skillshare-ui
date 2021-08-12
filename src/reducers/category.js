const currentCategories = localStorage.getItem("categories")
  ? JSON.parse(localStorage.getItem("categories"))
  : null;

const initialState = {
  categories: currentCategories ? currentCategories.categories : [],
  category: {},
  loading: false,
  error: null,
};

export const categories = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORIES_REQUEST":
    case "UPDATE_CATEGORY_REQUEST":
    case "ADD_CATEGORY_REQUEST":
    case "DELETE_CATEGORY_REQUEST":
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
    case "GET_CATEGORIES_FAILED":
      return {
        user: initialState.categories,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
