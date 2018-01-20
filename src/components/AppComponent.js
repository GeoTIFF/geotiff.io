import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapContainerComponent from './MapContainerComponent';
import Menu from '../containers/Menu';
import Modal from '../containers/Modal';
import Loader from '../containers/Loader';

const AppComponent = ({ layout, set_layout }) => (
    <div
        className="App"
        data-layout={layout}
    >
        <Loader />
        <Menu />
        <MapContainerComponent />
        <Modal />
    </div>
);

export default AppComponent;
