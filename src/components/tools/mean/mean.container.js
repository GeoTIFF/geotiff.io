import geoblaze from 'geoblaze';
import BaseStats from '../base-stats';
import MeanComponent from './mean.component';
import { withProps } from 'recompose';

const calculate_mean = (raster, coors) => {
  return geoblaze.mean(raster, coors)
    .map(value => value.toFixed(2)).join(', ');
}

const MeanContainer = withProps(
  { func: calculate_mean }
)(BaseStats(MeanComponent));

export default MeanContainer;
