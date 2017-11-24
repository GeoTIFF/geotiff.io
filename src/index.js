import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import build_store from './build-store';
import { Provider } from 'react-redux';
import { load_tools } from './actions/tool-list-actions';
import Map from './Map';

let store = build_store();
store.dispatch(load_tools());
window.store = store; // made this global temporarily so the add_raster action can be dispatched from main.js

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);

Map.initialize();
