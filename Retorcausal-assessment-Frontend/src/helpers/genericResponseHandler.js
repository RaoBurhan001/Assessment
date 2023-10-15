// errorHandling.js
import {toast} from 'react-toastify';

export function handleApiError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      const { data, status } = error.response;
   
      if (status === 400) {
        // Handle Bad Request errors (status code 400)
        console.error('Bad Request:', data.error);
        return 'Bad Request: ' + data.error;
      }
      if (status === 401) {
        // Handle Unauthorized errors (status code 401)
        console.error('Unauthorized:', data.error);
        return 'Unauthorized: ' + data.error;
      }
      if (status === 404) {
        // Handle Not Found errors (status code 404)
        console.error('Not Found:', data.error);
        return 'Not Found: ' + data.error;
      }
      if (status === 500) {
        // Handle Not Found errors (status code 404)
        console.error('Internal server error:', data.error);
        toast.error( data.error)
        return 'Internal server error: ' + data.error;
      }
      // Add more status code handlers as needed
  
      // For unhandled status codes
      console.error('Request Error:', data.error);
      return 'Request Error: ' + data.error;
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No Response from Server');
      return 'No Response from Server';
    } else {
      // Something happened in setting up the request
      console.error('Request Setup Error:', error.message);
      return 'Request Setup Error: ' + error.message;
    }
  }
  

  export function handleApiResponse(response) {
    if (response.status === 200) {
      // Handle successful response (status code 200)
      return response.data;
    }
    if (response.status === 201) {
      // Handle resource created successfully (status code 201)
      return response.data;
    }
    if (response.status === 204) {
      // Handle no content (status code 204)
      return null;
    }
  
    // Handle other status codes or errors
    throw new Error('Response Error: ' + response.status);
  }
  