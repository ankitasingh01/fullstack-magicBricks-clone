import USER_ACTION_TYPES from "./user.types";

export const USER_INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_FIRSTNAME:
      return { ...state, firstName: payload };
    case USER_ACTION_TYPES.SET_LASTNAME:
      return { ...state, lastName: payload };
    case USER_ACTION_TYPES.SET_EMAIL:
      return { ...state, email: payload };
    case USER_ACTION_TYPES.SET_PASSWORD:
      return { ...state, password: payload };
    default:
      return state;
  }
};
