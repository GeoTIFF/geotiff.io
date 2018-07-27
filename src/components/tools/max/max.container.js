import geoblaze from 'geoblaze';
import BaseStats from '../base-stats';
import MaxComponent from './max.component';
import { withProps } from 'recompose';

const calculateMax = (raster, coors) => {
  return geoblaze.max(raster, coors)
    .map(value => value.toFixed(2)).join(', ');
}

const MaxContainer = withProps(
  { func: calculateMax }
)(BaseStats(MaxComponent));

export default MaxContainer;
