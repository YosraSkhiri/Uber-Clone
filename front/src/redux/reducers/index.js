import { combineReducers } from 'redux';
import loginReducer from './login';
import userDataReducer from './userData';

const allReducers = combineReducers({
    login: loginReducer,
    userData: userDataReducer
});

export default allReducers;
