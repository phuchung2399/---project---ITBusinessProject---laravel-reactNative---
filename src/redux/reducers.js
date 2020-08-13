import {combineReducers} from 'redux';
import userReducer from './userRedux/reducer';
import stores from './storeRedux/reducer';
import services from './serviceRedux/reducer';
import slices from './slideRedux/reducer';

const myReducer = combineReducers({
  user: userReducer,
  stores,
  services,
  slices,
});

export default myReducer;
