import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import {logger} from 'redux-logger';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(logger), applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
export default store;
