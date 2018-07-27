import geoblaze from 'geoblaze';
import BaseStats from '../base-stats';
import SumComponent from './sum.component';
import { withProps } from 'recompose';

const calculateSum = (raster, coors) => {
  return geoblaze.sum(raster, coors)
    .map(value => value.toFixed(2)).join(', ');
}

const SumContainer = withProps(
  { func: calculateSum }
)(BaseStats(SumComponent));

export default SumContainer;
