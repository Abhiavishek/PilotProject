import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import tasksReducer from './reducers';

const store = createStore(tasksReducer, applyMiddleware(thunkMiddleware));

export default store;
