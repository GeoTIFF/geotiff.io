import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MapContainer from '../map-container';
import Menu from '../menu';
import Load from '../tools/load';
import Identify from '../tools/identify';
import Download from '../tools/download';
import Histogram from '../tools/histogram';
import Max from '../tools/max';
import Mean from '../tools/mean';
import Median from '../tools/median';
import Min from '../tools/min';
import Mode from '../tools/mode';
import Sum from '../tools/sum';
import BandArithmetic from '../tools/band-arithmetic';
import RasterCalculator from '../tools/raster-calculator';
import Modal from '../modal';
import Loader from '../loader';
import Alert from '../alert';

const AppComponent = ({ layout, setLayout }) => (
  <div
    className="App"
    data-layout={layout}
  >
    <Alert />
    <Loader />
    <Switch>
      <Route path='/download' component={Download} />
      <Route path='/histogram' component={Histogram} />
      <Route path='/identify' component={Identify} />
      <Route path='/load' component={Load} />
      <Route path='/max' component={Max} />
      <Route path='/mean' component={Mean} />
      <Route path='/median' component={Median} />
      <Route path='/min' component={Min} />
      <Route path='/mode' component={Mode} />
      <Route path='/sum' component={Sum} />
      <Route path='/band-arithmetic' component={BandArithmetic} />
      <Route path='/raster-calculator' component={RasterCalculator} />
      <Route component={Menu} />
    </Switch>
    <MapContainer />
    <Modal />
  </div>
);

export default AppComponent;
