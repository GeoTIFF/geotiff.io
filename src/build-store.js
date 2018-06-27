import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root';
import thunk from 'redux-thunk';

const buildStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
}

export default buildStore;
