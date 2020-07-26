import {combineReducers} from 'redux';
import userReducer from './userRedux/reducer';

const myReducer = combineReducers({
  user: userReducer,
});

export default myReducer;