import * as types from 'actionTypes';

export const tasksReducer = (state = {
        isLoading: false,
        data: [],
        error: false}
    , action = null) => {
        switch(action.type) {
            case types.FETCH_TASKS_START:
            case types.FETCH_MORE_TASKS_START:
                return Object.assign({}, state, { isLoading: true, error: false });

            case types.FETCH_TASKS_SUCCESS:
                return Object.assign({}, state,
                    {
                        isLoading: false, 
                        data: action.data, 
                        error: false
                    });
            case types.FETCH_MORE_TASKS_SUCCESS:
                return Object.assign({}, state,
                    {
                        isLoading: false, 
                        data: state.data.concat(action.data),
                        error: false
                    });
            case types.UPDATE_TASK_SUCCESS:
                const updateTaskExists = state.data.find(x => x['_id'] === action.data['_id']);
                if(updateTaskExists && updateTaskExists.status !== action.data.status) {
                    return Object.assign({}, state,
                        {
                            isLoading: false, 
                            data: state.data.filter(item => item['_id'] !== action.data['_id']),
                            error: false
                        });
                }
                return Object.assign({}, state,
                    {
                        isLoading: false, 
                        data: state.data.map(item => {
                            if(item['_id'] === action.data['_id']) {
                                return action.data;
                            } else {
                                return item;
                            }
                        }),
                        error: false
                    });
            case types.DELETE_TASK_SUCCESS:
                return Object.assign({}, state,
                    {
                        isLoading: false, 
                        data: state.data.filter(x => x['_id'] !== action.data.id),
                        error: false
                    });
             case types.CREATE_TASK_SUCCESS:
                return Object.assign({}, state,
                    {
                        isLoading: false, 
                        data: [
                            ...state.data,
                            action.data
                        ],
                        error: false
                    });

            case types.FETCH_TASKS_FAILURE:
            case types.FETCH_MORE_TASKS_FAILURE:
                return Object.assign({}, state,
                    {
                        isLoading: false, 
                        data: [], 
                        error: true
                    });
        default:
            return state;
        }
};