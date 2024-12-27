import { ToastContainer, toast } from 'react-toastify';
const axios = require('axios')



const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
});

instance.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    const status = error && error.response && error.response.status || 500;
    // we can handle global errors here
    switch (status) {
        // authentication (token related issues)
        case 401: {
            toast.error("Unauthorized user,please login...")
            return error;
        }

        // forbidden (permission related issues)
        case 403: {
            toast.error("You dont have permistion to access!")
            return error;
        }

        // bad request
        case 400: {
            return Promise.reject(error);
        }

        // not found
        case 404: {
            return Promise.reject(error);
        }

        // conflict
        case 409: {
            return Promise.reject(error);
        }

        // unprocessable
        case 422: {
            return Promise.reject(error);
        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject(error);
        }
    }

});


export default instance;