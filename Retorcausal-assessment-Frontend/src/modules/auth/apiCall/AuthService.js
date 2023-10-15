import {
  handleApiResponse,
  handleApiError,
} from '../../../helpers/genericResponseHandler';
import apiClient from '../../../service';
import AUTH_URLS from '../constants/UrlConstant';

export const loginUser = async (payload) => {
  try {
    const response = await apiClient().post(AUTH_URLS.LOGIN, payload);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

export const signUpUser = async (payload) => {
  try {
    const response = await apiClient().post(AUTH_URLS.SIGNUP, payload);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};
