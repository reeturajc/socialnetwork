import _axios, {AxiosRequestConfig} from 'axios';
import {getEnvVariable} from '../environment';
export class Http {
    private static axios = _axios.create({
        baseURL: getEnvVariable().baseUrl,
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: false
    });
    static async get(url:string, config?: AxiosRequestConfig) {
        try {
            const response = await Http.axios.get(url, config);
            if (response) {
                return response.data;
            }
        } catch (e) {
            Http.handleErrors(e);
            return Promise.reject(e);
        }
    }
    static async post(url:string, body?: object, config?: AxiosRequestConfig) {
        try {
            const response = await Http.axios.post(url, body, config);
            if (response) {
                return response.data;
            }
        } catch (e) {
            Http.handleErrors(e);
            return Promise.reject(e);
        }
    }
    static async put(url:string, body?: object, config?: AxiosRequestConfig) {
        try {
            const response = await Http.axios.put(url, body, config);
            if (response) {
                return response.data;
            }
        } catch (e) {
            Http.handleErrors(e);
            return Promise.reject(e);
        }
    }
    static async delete(url:string, config?: AxiosRequestConfig) {
        try {
            const response = await Http.axios.delete(url, config);
            if (response) {
                return response.data;
            }
        } catch (e) {
            Http.handleErrors(e);
            return Promise.reject(e);
        }
    }
    private static handleErrors(error:any) {
        if (error.response) {
            const message = error.response.data.message;
            const errorMessage = message
                ? message
                : 'Something Went Wrong. Please Try Again';
            alert(errorMessage);
        } else {
            alert('Something Went Wrong.Please Try Again');
        }
    }
}
