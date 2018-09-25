import OfflinePluginRuntime from 'offline-plugin/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';
import buildStore from './build-store';
import { Provider } from 'react-redux';
import { loadTools } from './actions/tool-list-actions';
import { addRaster } from './actions/raster-actions';
import { toolName, url } from './services/path';
import { getTool } from './services/tools';
import Map from './Map';
import '../styles/style.less';

OfflinePluginRuntime.install();

const store = buildStore();
store.dispatch(loadTools());
window.store = store; // made this global so it can be accessed from Map

if (url) store.dispatch(addRaster(url));

if (toolName) {
  const tool = getTool(toolName);
  if (tool) {
    // newSearch is usually something like ?auto_start=true&url=...
    const newSearch = window.location.search
      .replace(/(\?|&)tool=[a-z-]{3,100}/, '') // remove tool=... param from url
      .replace(/^./, '?'); // mark sure starting search param is a question mark

    // newPathName is usually something like 'identify' or 'min'
    const newPathName = tool.path;

    // newUrl is usually something like /identify?url=...
    const newUrl = newPathName + newSearch;

    /* global history */
    history.replaceState({}, 'identify', newUrl);
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

Map.initialize();
