import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapContainer from '../map-container';
import Menu from '../menu';
import Modal from '../modal';
import Loader from '../loader';
import Alert from '../alert';

const AppComponent = ({ layout, set_layout }) => (
  <div
    className="App"
    data-layout={layout}
  >
    <Alert />
    <Loader />
    <Menu />
    <MapContainer />
    <Modal />
  </div>
);

export default AppComponent;
