const currentUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const noUser = {
  userId: null,
  token: null,
  admin: null,
};

const initialState = {
  user: currentUser ? currentUser : noUser,
  loading: false,
  error: null,
};

export const authentication = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER_REQUEST":
    case "REGISTER_USER_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "REGISTER_USER_SUCCESS":
      return {
        loading: false,
        user: {
          userId: action.payload.id,
          token: action.payload.token,
          admin: false,
        },
      };
    case "LOGIN_USER_FAILED":
    case "REGISTER_USER_FAILED":
      return {
        user: initialState.user,
        loading: false,
        error: action.payload,
      };
    case "LOGIN_USER_SUCCESS":
      return {
        loading: false,
        error: null,
        user: {
          userId: action.payload.userId,
          token: action.payload.token,
          admin: action.payload.admin,
        },
      };
    case "LOGOUT_USER_SUCCESS":
      return {
        ...state,
        user: noUser,
      };
    default:
      return state;
  }
};
