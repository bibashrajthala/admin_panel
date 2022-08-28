import { USER_ACTION_TYPES } from "./user.types";

const USER_INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.AUTH_START:
      return { ...state, loading: true, error: null };
    case USER_ACTION_TYPES.AUTH_SUCCESS:
      localStorage.setItem("accessToken", payload?.accessToken); // put currentUser data in profile of localstorage as well
      return { ...state, currentUser: payload, loading: false, error: null };
    case USER_ACTION_TYPES.AUTH_FAILED:
      return { ...state, currentUser: null, loading: false, error: payload };
    default:
      return state;
  }
};
