import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/root';
import thunk from 'redux-thunk';

const buildStore = () => {
  const composeTool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(rootReducer, composeTool(applyMiddleware(thunk)));
}

export default buildStore;
