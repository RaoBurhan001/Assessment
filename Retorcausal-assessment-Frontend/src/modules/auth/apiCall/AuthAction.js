import { handleApiError } from '../../../helpers/genericResponseHandler';
import { toast } from 'react-toastify';
import { loginUser, signUpUser } from './AuthService';

/**
 * Action to log in a user.
 *
 * @param {Object} payload - User login data.
 * @returns {Promise<Object>} The response from the login request.
 */
export const loginUserAction = async (payload) => {
  try {
    const response = await loginUser(payload);

    // Check if the login was successful (status code 200).
    if (response.statusCode === 200) {
      const formatMsg = 'User Logged in successfully';
      toast.success(formatMsg);

      // Store the access token in local storage for future use.
      localStorage.setItem('accessToken', response.data.token);

      return response.data;
    }
  } catch (error) {
    // Handle and log API errors.
    handleApiError(error);
  }
};

/**
 * Action to sign up a user.
 *
 * @param {Object} payload - User signup data.
 * @returns {Promise<Object>} The response from the signup request.
 */
export const signUpUserAction = async (payload) => {
  try {
    const response = await signUpUser(payload);

    // Check if the signup was successful (status code 200).
    if (response.statusCode === 200) {
      const formatMsg = 'User Signed up successfully';
      toast.success(formatMsg);

      return response.data;
    }
  } catch (error) {
    // Handle and log API errors.
    handleApiError(error);
  }
};
