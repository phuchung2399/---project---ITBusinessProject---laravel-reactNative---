import {combineReducers} from 'redux';
import userReducer from './userRedux/reducer';
import stores from './storeRedux/reducer';

const myReducer = combineReducers({
  user: userReducer,
  stores,
});

export default myReducer;
