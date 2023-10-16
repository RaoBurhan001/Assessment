import {
  handleApiResponse,
  handleApiError,
} from '../../../helpers/genericResponseHandler';
import apiClient from '../../../service';
import USER_URLS from '../constants/UrlConstants';

/**
 * Get a list of users with optional query parameters.
 * @param {Object} params - Query parameters for filtering users.
 * @returns {Object} - Response containing user data.
 */
export const getUsers = async (params) => {
  try {
    const fullUrl = `${USER_URLS.GET_USERS}?${params.toString()}`;
    const response = await apiClient().get(fullUrl);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Delete a user by their ID.
 * @param {string} payload - ID of the user to delete.
 * @returns {Object} - Response confirming the deletion.
 */
export const deleteUser = async (payload) => {
  try {
    const response = await apiClient().delete(USER_URLS.DELETE_USER + payload, null);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Get a user by their ID.
 * @param {string} payload - ID of the user to retrieve.
 * @returns {Object} - User data.
 */
export const getUserById = async (payload) => {
  try {
    const response = await apiClient().get(USER_URLS.GET_USER + payload, null);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Get a list of countries.
 * @returns {Object} - Response containing country data.
 */
export const getCountries = async () => {
  try {
    const response = await apiClient().get(USER_URLS.GET_COUNTRIES, null);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Get a list of states for a specific country.
 * @param {string} payload - ID of the country to get states for.
 * @returns {Object} - Response containing state data.
 */
export const getStatesByCountryId = async (payload) => {
  try {
    const response = await apiClient().get(USER_URLS.GET_STATES + payload, null);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Get a list of cities for a specific state.
 * @param {string} payload - ID of the state to get cities for.
 * @returns {Object} - Response containing city data.
 */
export const getCitiesByStateId = async (payload) => {
  try {
    const response = await apiClient().get(USER_URLS.GET_CITIES + payload, null);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * Update user information by their ID.
 * @param {string} id - ID of the user to update.
 * @param {Object} payload - New user data.
 * @returns {Object} - Response containing updated user data.
 */
export const updateUser = async (id, payload) => {
  try {
    const response = await apiClient().put(USER_URLS.UPDATE_USER + id, payload);
    return handleApiResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};
