import USER_ACTION_TYPES from "./user.types";
import { createAction } from "../utils/reducer.utils";

export const setFirstName = (firstName) =>
  createAction(USER_ACTION_TYPES.SET_FIRSTNAME, firstName);

export const setLastName = (lastName) =>
  createAction(USER_ACTION_TYPES.SET_LASTNAME, lastName);

export const setEmail = (email) =>
  createAction(USER_ACTION_TYPES.SET_EMAIL, email);

export const setPassword = (password) =>
  createAction(USER_ACTION_TYPES.SET_PASSWORD, password);
