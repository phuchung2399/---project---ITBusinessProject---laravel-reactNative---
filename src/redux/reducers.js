import {combineReducers} from 'redux';
import userReducer from './userRedux/reducer';
import stores from './storeRedux/reducer';
import services from './serviceRedux/reducer';
import slices from './slideRedux/reducer';
import comments from './commentRedux/reducer';

const myReducer = combineReducers({
  user: userReducer,
  stores,
  services,
  slices,
  comments,
});

export default myReducer;
