import {combineReducers} from 'redux';
import login from './login';
import users from './users';
import repositories from './repositories';

export default combineReducers({
    login,
    users,
    repositories
});

