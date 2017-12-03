import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import build_store from './build-store';
import { Provider } from 'react-redux';
import { load_tools } from './actions/tool-list-actions';
import { add_raster } from './actions/raster-actions';
import UrlService from './services/UrlService';
import Map from './Map';

let store = build_store();
store.dispatch(load_tools());
window.store = store; // made this global so it can be accessed from Map

let url = UrlService.get('url');
if (url) {
    store.dispatch(add_raster(url));
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

Map.initialize();
