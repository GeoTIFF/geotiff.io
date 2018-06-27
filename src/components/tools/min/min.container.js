import geoblaze from 'geoblaze';
import BaseStats from '../base-stats';
import MinComponent from './min.component';
import { withProps } from 'recompose';

const calculateMin = (raster, coors) => {
  return geoblaze.min(raster, coors)
    .map(value => value.toFixed(2)).join(', ');
}

const MinContainer = withProps(
  { func: calculateMin }
)(BaseStats(MinComponent));

export default MinContainer;
