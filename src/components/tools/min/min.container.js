import geoblaze from 'geoblaze';
import BaseStats from '../base-stats';
import MinComponent from './min.component';
import { withProps } from 'recompose';

const calculateMin = async (raster, coors) => {
  const result = await geoblaze.min(raster, coors)
  return result.map(value => value.toFixed(2)).join(', ');
}

const MinContainer = withProps(
  { func: calculateMin }
)(BaseStats(MinComponent));

export default MinContainer;
