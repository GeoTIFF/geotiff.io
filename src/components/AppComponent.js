import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapContainerComponent from './MapContainerComponent';
import Menu from '../containers/Menu';

const AppComponent = ({ layout, set_layout }) => (
    <div 
        className="App"
        data-layout={layout}
    >
        <Menu />
        <MapContainerComponent />
    </div>
);

export default AppComponent;