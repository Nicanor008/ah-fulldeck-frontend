import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  const initialState = {}
  const storeConfig = () => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(thunk, logger), composeEnhancers/* other store enhancers if any */)
  );
  return store;
};
export default storeConfig;
