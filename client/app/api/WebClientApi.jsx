import axios from 'axios';

export default {
    baseUrl: 'http://localhost:3012/api/',

    fetch(url, requestAction, successAction, errorAction, 
            options = {
                method: 'get',
                responseType: 'json',
                callback: null
            }
        ) {
        return (dispatch) => {
            dispatch(requestAction());
            return axios({
                baseURL: this.baseUrl,
                url: url,
                timeout: 100000,
                method: options.method,
                responseType: options.responseType
            })
            .then(function (response) {
                dispatch(successAction(response.data));
                if(options.callback) {
                    options.callback(false);
                }
            })
            .catch(function (response) {
                dispatch(errorAction(response.data));
                if(options.callback) {
                    options.callback(true);
                }
            });
        }
    },

    post(url, data, requestAction, successAction, errorAction, 
            options = {
                method: 'post',
                responseType: 'json',
                callback: null
            }
        ) {
        return (dispatch) => {
            dispatch(requestAction());
            return axios({
                baseURL: this.baseUrl,
                url: url,
                timeout: 100000,
                method: options.method,
                responseType: options.responseType,
                data: data
            })
            .then((response) => {
                dispatch(successAction(response.data));
                if(options.callback) {
                    options.callback(false);
                }
            })
            .catch((response) => {
                dispatch(errorAction(response.data));
                if(options.callback) {
                    options.callback(true);
                }
            });
        };
    },

    put(url, data, requestAction, successAction, errorAction, 
            options = {
                method: 'put',
                responseType: 'json',
                callback: null
            }
        ) {
        return (dispatch) => {
            dispatch(requestAction());
            return axios({
                baseURL: this.baseUrl,
                url: url,
                timeout: 100000,
                method: options.method,
                responseType: options.responseType,
                data: data
            })
            .then((response) => {
                dispatch(successAction(response.data));
                if(options.callback) {
                    options.callback(false);
                }
            })
            .catch((response) => {
                dispatch(errorAction(response.data));
                if(options.callback) {
                    options.callback(true);
                }
            });
        };
    },

    delete(url, requestAction, successAction, errorAction, 
            options = {
                method: 'delete', 
                responseType: 'json',
                callback: null
            }
        ) {
        return (dispatch) => {
            dispatch(requestAction());
            return axios({
                    baseURL: this.baseUrl,
                    url: url,
                    timeout: 100000,
                    method: options.method,
                    responseType: options.responseType
                })
                .then((response) => {
                    dispatch(successAction(response.data));
                    if (options.callback) {
                        options.callback(false);
                    }
                })
                .catch((response) => {
                    dispatch(errorAction(response.data));
                    if (options.callback) {
                        options.callback(true);
                    }
                });
        };
    }
}