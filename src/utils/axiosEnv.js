import axios from 'axios';
import { getAuthToken } from './auth';
import {BASE_API} from "./constants";

const server = BASE_API;
// Add a response interceptor
export const catchAxiosError = (error) => {
    console.log('ERROR', error);
    return {error};
};

const API = axios.create({
    baseURL: server,
    timeout: 9000,
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}
});

API.TOKEN = ''; // Logged user token

API.interceptors.request.use(config => {
    // perform a task before the request is sent
    const token = getAuthToken();
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}, error => {
    // handle the error
    return Promise.reject({error});
});

API.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const result = {};
    if (!response.data.success) {
        result.error = response.data.message ? response.data.message : 'Something went wrong.';
    } else {
        result.response = response.data;
    }
    return result;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject({error});
});

API.setToken = (token) => {
    API.TOKEN = token;
};

export default API;