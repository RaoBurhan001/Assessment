import {
    handleApiResponse,
    handleApiError,
  } from '../../../helpers/genericResponseHandler';
  import apiClient from '../../../service';
  import USER_URLS from '../constants/UrlConstants';

export const getUsers = async (params) => {
    try {
        const fullUrl = `${USER_URLS.GET_USERS}?${params.toString()}`;
        const response = await apiClient().get(fullUrl);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  };

  export const deleteUser = async (payload) => {
    try {
     const response = await apiClient().delete(USER_URLS.DELETE_USER +payload ,null);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  };