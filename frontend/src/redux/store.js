import { createStore } from 'redux';
import reducer from './reducers';

// TODO: This should only initialize for development
// eslint-disable-next-line no-underscore-dangle
const enhancer = window.__REDUX_DEVTOOLS_EXTENSION__
  // eslint-disable-next-line no-underscore-dangle
  && window.__REDUX_DEVTOOLS_EXTENSION__();

export default createStore(reducer, enhancer);
