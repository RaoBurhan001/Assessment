import { handleApiError } from '../../../helpers/genericResponseHandler';
import { toast } from 'react-toastify';
import {
  deleteUser,
  getUsers,
  getUserById,
  getCountries,
  getStatesByCountryId,
  getCitiesByStateId,
  updateUser
} from './UserService';

/** 
 * Function to retrieve a list of users.
 * @param {Object} params - Additional parameters for the request.
 * @returns {Array} - An array of user data.
 */
export const getUsersAction = async (params) => {
  try {
    const response = await getUsers(params);
    if (response.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
};

/** 
 * Function to delete a user.
 * @param {Object} payload - Data of the user to delete.
 * @returns {Number} - HTTP status code indicating the success of the operation.
 */
export const deleteUserAction = async (payload) => {
  try {
    const response = await deleteUser(payload);
    if (response.statusCode === 200) {
      toast.success("User deleted successfully")
      return response.status;
    }
  } catch (error) {
    handleApiError(error);
  }
};

/** 
 * Function to retrieve a user by their ID.
 * @param {string} payload - ID of the user to retrieve.
 * @returns {Object} - User data.
 */
export const getUserByIdAction = async (payload) => {
  try {
    const response = await getUserById(payload);
    if (response.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
};

/** 
 * Function to update a user's information.
 * @param {string} id - ID of the user to update.
 * @param {Object} payload - Updated user data.
 * @returns {Object} - Updated user data.
 */
export const updateUserAction = async (id, payload) => {
  try {
    const response = await updateUser(id, payload);
    if (response.statusCode === 200) {
      toast.success("User updated successfully")
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
};

/** 
 * Function to retrieve a list of countries.
 * @returns {Array} - An array of country data.
 */
export const getCountriesAction = async () => {
  try {
    const response = await getCountries();
    if (response.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
};

/** 
 * Function to retrieve a list of states for a specific country.
 * @param {Object} payload - ID of the country for which to retrieve states.
 * @returns {Array} - An array of state data.
 */
export const getStatesByCountryIdAction = async (payload) => {
  try {
    const response = await getStatesByCountryId(payload);
    if (response.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
};

/** 
 * Function to retrieve a list of cities for a specific state.
 * @param {Object} payload - ID of the state for which to retrieve cities.
 * @returns {Array} - An array of city data.
 */
export const getCitiesByStateIdAction = async (payload) => {
  try {
    const response = await getCitiesByStateId(payload);
    if (response.statusCode === 200) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
};
