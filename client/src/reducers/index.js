import { combineReducers } from 'redux';
import authReducer from './authReducer';
import Vars from './Vars';

export const reducers = combineReducers({
    authReducer,
    Vars,
});