import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import build_store from './build-store';
import { Provider } from 'react-redux';
import { load_tools } from './actions/tool-list-actions';
import { add_raster } from './actions/raster-actions';
import { mount_tool } from './actions/active-tool-actions';
import UrlService from './services/UrlService';
import ToolListService from './services/ToolListService';
import Map from './Map';
import _ from 'underscore';

let store = build_store();
store.dispatch(load_tools());
window.store = store; // made this global so it can be accessed from Map

let url = UrlService.get('url');
if (url) {
  store.dispatch(add_raster(url));
}

let tool_name = UrlService.get('tool');
if (tool_name) {
  ToolListService.get_tool_list().then(tools => {
    let tool = _.find(tools, tool => tool[2] === tool_name);
    if (tool) store.dispatch(mount_tool(tool[3]));
  });
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

Map.initialize();
