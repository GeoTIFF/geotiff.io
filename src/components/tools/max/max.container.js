import geoblaze from 'geoblaze';
import BaseStats from '../base-stats';
import MaxComponent from './max.component';
import { withProps } from 'recompose';

const calculateMax = async (raster, coors) => {
  const result = await geoblaze.max(raster, coors)
  return result.map(value => value.toFixed(2)).join(', ');
}

const MaxContainer = withProps(
  { func: calculateMax }
)(BaseStats(MaxComponent));

export default MaxContainer;
