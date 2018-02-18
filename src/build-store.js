import { createStore, applyMiddleware } from 'redux';
import root_reducer from './reducers/root';
import thunk from 'redux-thunk';

const build_store = () => {
  return createStore(root_reducer, applyMiddleware(thunk));
}

export default build_store;
