import { ToastContainer, toast } from 'react-toastify';
import axios, { isCancel, AxiosError } from 'axios';



const instance = axios.create({
    baseURL: 'http://localhost:8080',
});

instance.defaults.withCredentials = true;

instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // toast(<img className='margin-auto-img'
    //     width={'50px'} height={'50px'}
    //     src='https://cdn-icons-gif.flaticon.com/6172/6172512.gif'></img>)
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('res axios', response)

    return response;
}, (error) => {
    console.log('err axios', error)
    const status = error.response ? error.response.status : 500;
    console.log('status axios', status)
    // we can handle global errors here
    switch (status) {
        // authentication (token related issues)
        case 401: {
            toast.warn(error.response.data.EM);
            return error.response;
        }

        // forbidden (permission related issues)
        case 403: {
            toast.warn(error.response.data.EM);
            return error.response;
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