import { handleApiError } from '../../../helpers/genericResponseHandler';
import { toast } from 'react-toastify';
import { loginUser, signUpUser } from './AuthService';
/**  create company api call use to create company via company services   */
export const loginUserAction = async (payload) => {
    try {
      const response = await loginUser(payload);
      if (response.statusCode === 200) {
        const formatMsg = 'User Logged in successfully';
        toast.success(formatMsg);
        localStorage.setItem('accessToken', response.data.token);
        return response.data
      }
    } catch (error) {
      handleApiError(error);
    }
  };


export const signUpUserAction = async (payload) => {
  try {
    const response = await signUpUser(payload);
    if (response.statusCode === 200) {
      const formatMsg = 'User Signed up successfully';
      toast.success(formatMsg);
      return response.data
    }
  } catch (error) {
    handleApiError(error);
  }
};
