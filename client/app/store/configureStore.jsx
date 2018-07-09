const redux = require('redux');
const thunk = require('redux-thunk').default;

import { tasksReducer } from '../reducers/tasks.reducer';

export default function configure() {
    const reducer = redux.combineReducers({
        tasks: tasksReducer,
    });

    const store = redux.createStore(
        reducer, 
        redux.compose(
            redux.applyMiddleware(thunk),
            window.devToolsExtension 
                ? window.devToolsExtension() 
                : f => f
        )
    );

    return store;
}