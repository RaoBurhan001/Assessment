import { handleApiError } from '../../../helpers/genericResponseHandler';
import { toast } from 'react-toastify';
import { deleteUser, getUsers } from './UserService';
/**  create company api call use to create company via company services   */
export const getUsersAction = async (params) => {
try {
      const response = await getUsers(params);
      if (response.statusCode === 200) {
        return response.data
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  export const deleteUserAction = async (payload) => {
    try {
      const response = await deleteUser(payload);
      if (response.statusCode === 200) {
        return response.status
      }
    } catch (error) {
      handleApiError(error);
    }
  };