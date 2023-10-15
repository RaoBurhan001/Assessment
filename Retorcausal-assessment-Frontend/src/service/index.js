import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/';

const isCompleteUrl = (url = '') => {
  const val = url.indexOf('https://') > -1 || url.indexOf('http://') > -1;
  return val;
};

const apiClient = () => {
  let api = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*',
    },
  });

  // Add a request interceptor
  api.interceptors.request.use(
    (config) => {
      const storedAccessToken = localStorage.getItem('accessToken');
      if (storedAccessToken) {
        config.headers.Authorization = `Bearer ${storedAccessToken}`;
       }

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  return {
    get: async (url, params = {}) => {
      if (!isCompleteUrl(url)) {
        url = `${apiUrl}${url}`;
      }
      return api.get(url, { params });
    },
    post: async (url, data) => {
      /**  this disptach update the loading state to true  */

      if (!isCompleteUrl(url)) {
        url = `${apiUrl}${url}`;
      }

      return api.post(url, data);
    },
    put: async (url, data) => {
      /**  this disptach update the loading state to true  */

      if (!isCompleteUrl(url)) {
        url = `${apiUrl}${url}`;
      }

      return api.put(url, data);
    },
    delete: async (url) => {
      /**  this disptach update the loading state to true  */
      if (!isCompleteUrl(url)) {
        url = `${apiUrl}${url}`;
      }
      return api.delete(url);
    },
  };
};

export default apiClient;
