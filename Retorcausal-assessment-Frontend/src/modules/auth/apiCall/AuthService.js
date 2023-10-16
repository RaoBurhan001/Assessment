import {
  handleApiResponse,
  handleApiError,
} from '../../../helpers/genericResponseHandler';
import apiClient from '../../../service';
import AUTH_URLS from '../constants/UrlConstant';

/**
 * Logs in a user by making a POST request to the login endpoint.
 *
 * @param {Object} payload - User login data.
 * @returns {Promise<Object>} The response from the login request.
 */
export const loginUser = async (payload) => {
  try {
    // Send a POST request to the login endpoint with the provided payload.
    const response = await apiClient().post(AUTH_URLS.LOGIN, payload);

    // Handle the API response, parsing the data and status code.
    return handleApiResponse(response);
  } catch (error) {
    // Handle and log API errors.
    return handleApiError(error);
  }
};

/**
 * Signs up a user by making a POST request to the signup endpoint.
 *
 * @param {Object} payload - User signup data.
 * @returns {Promise<Object>} The response from the signup request.
 */
export const signUpUser = async (payload) => {
  try {
    // Send a POST request to the signup endpoint with the provided payload.
    const response = await apiClient().post(AUTH_URLS.SIGNUP, payload);

    // Handle the API response, parsing the data and status code.
    return handleApiResponse(response);
  } catch (error) {
    // Handle and log API errors.
    return handleApiError(error);
  }
};
