import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapContainerComponent from './MapContainerComponent';
import Menu from '../containers/Menu';
import Loader from '../containers/Loader';

const AppComponent = ({ layout, set_layout }) => (
    <div 
        className="App"
        data-layout={layout}
    >
        <Loader />
        <Menu />
        <MapContainerComponent />
    </div>
);

export default AppComponent;