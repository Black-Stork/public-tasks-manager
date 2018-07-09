import * as types from 'actionTypes';
import WebClientApi from '../api/WebClientApi';

// < FETCH >

function fetchTasksStart() {
    return { type: types.FETCH_TASKS_START }
};

function fetchTasksSuccess(json) {
    return {
        type: types.FETCH_TASKS_SUCCESS,
        data: json
    }
};

function fetchTasksError(json) {
    return {
        type: types.FETCH_TASKS_FAILURE,
        data: json
    }
};

export const fetchTasks = (status, limit = null) => {
    const params = {
        status,
        limit
    };
    const queryString = Object
        .keys(params)
        .filter(key => typeof(params[key]) !== 'undefined')
        .map(key => key + '=' + params[key])
        .join('&');

    const url = `${['tasks'].join('/')}${queryString ? '?' + queryString : ''}`;
    return WebClientApi.fetch(
        url, 
        fetchTasksStart,
        fetchTasksSuccess, 
        fetchTasksError
    );
}

// </ FERCH >

// < FETCH MORE >

function fetchMoreTasksStart() {
    return { type: types.FETCH_MORE_TASKS_START }
};

function fetchMoreTasksSuccess(json) {
    return {
        type: types.FETCH_MORE_TASKS_SUCCESS,
        data: json
    }
};

function fetchMoreTasksError(json) {
    return {
        type: types.FETCH_MORE_TASKS_FAILURE,
        data: json
    }
};

export const fetchMoreTasks = (status, skip, limit, callback) => {
    const params = {
        status,
        skip,
        limit
    };
    const queryString = Object
        .keys(params)
        .filter(key => typeof(params[key]) !== 'undefined')
        .map(key => key + '=' + params[key])
        .join('&');

    const url = `${['tasks'].join('/')}${queryString ? '?' + queryString : ''}`;

    return WebClientApi.fetch(
        url, 
        fetchMoreTasksStart,
        fetchMoreTasksSuccess, 
        fetchMoreTasksError,
        {method: 'get', responseType: 'json', callback})
    ;
}

// </ FERCH MORE >

// < UPDATE >

function updateTaskStart() {
    return { type: types.UPDATE_TASK_START }
};

function updateTaskSuccess(json) {
    return {
        type: types.UPDATE_TASK_SUCCESS,
        data: json
    }
};

function updateTaskError(json) {
    return {
        type: types.UPDATE_TASK_FAILURE,
        data: json
    }
};

export const updateTask = (task, callback) => {
    return WebClientApi.put(
        [
            'tasks'
        ].join('/'),
        task, 
        updateTaskStart,
        updateTaskSuccess, 
        updateTaskError,
        {method: 'put', responseType: 'json', callback})
    ;
}

// </ UPDATE >

// < DELETE >

function deleteTaskStart() {
    return { type: types.DELETE_TASK_START }
};

function deleteTaskSuccess(json) {
    return {
        type: types.DELETE_TASK_SUCCESS,
        data: json
    }
};

function deleteTaskError(json) {
    return {
        type: types.DELETE_TASK_FAILURE,
        data: json
    }
};

export const deleteTask = (id) => {
    return WebClientApi.delete(
        [
            'tasks',
            id
        ].join('/'), 
        deleteTaskStart,
        deleteTaskSuccess, 
        deleteTaskError)
    ;
}

// </ DELETE >

// < CREATE >

function createTaskStart() {
    return { type: types.CREATE_TASK_START }
};

function createTaskSuccess(json) {
    return {
        type: types.CREATE_TASK_SUCCESS,
        data: json
    }
};

function createTaskError(json) {
    return {
        type: types.CREATE_TASK_FAILURE,
        data: json
    }
};

export const createTask = (task, callback) => {
    return WebClientApi.post(
        [
            'tasks'
        ].join('/'),
        task, 
        createTaskStart,
        createTaskSuccess, 
        createTaskError,
        {method: 'post', responseType: 'json', callback})
    ;
}

// </ CREATE >