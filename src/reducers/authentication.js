export const authentication = (
  state = {
    user: {
      userId: null,
      token: null,
    },
    loading: false,
    error: null,
  },
  action
) => {
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
        user: { userId: action.payload.id, token: action.payload.token },
      };
    case "LOGIN_USER_FAILED":
    case "REGISTER_USER_FAILED":
      return {
        loading: false,
        error: action.payload,
      };
    case "LOGIN_USER_SUCCESS":
      return {
        loading: false,
        error: null,
        user: { userId: action.payload.userId, token: action.payload.token },
      };
    default:
      return state;
  }
};
