import { USER_ACTION_TYPES } from "./user.types";
import { createAction } from "../../utils/createAction";

import axios from "axios";

const loginUserStart = () => createAction(USER_ACTION_TYPES.AUTH_START);

const loginUserSuccess = (userData) =>
  createAction(USER_ACTION_TYPES.AUTH_SUCCESS, userData);

const loginUserFailed = (error) =>
  createAction(USER_ACTION_TYPES.AUTH_SUCCESS, error);

export const loginUserAsync = (formData) => async (dispatch) => {
  dispatch(loginUserStart());
  try {
    const { data } = await axios.post(
      "https://api.dynocrm.com/api/v1/users/login",
      formData
    );
    console.log(data);
    const userData = {
      ...formData,
      password: null,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
    console.log(userData);

    dispatch(loginUserSuccess(userData));
  } catch (error) {
    console.log(error);
    dispatch(loginUserFailed(error));
  }
};
