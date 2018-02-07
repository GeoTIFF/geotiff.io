import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapContainer from '../map-container';
import Menu from '../menu';
import Modal from '../modal';
import Loader from '../loader';

const AppComponent = ({ layout, set_layout }) => (
    <div
        className="App"
        data-layout={layout}
    >
        <Loader />
        <Menu />
        <MapContainer />
        <Modal />
    </div>
);

export default AppComponent;
