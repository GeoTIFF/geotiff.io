import geoblaze from 'geoblaze';
import BaseStats from '../base-stats';
import ModeComponent from './mode.component';
import { withProps } from 'recompose';

const calculate_mode = (raster, coors) => {
  let result = geoblaze.mode(raster, coors);
  return result.map(band => {
    return typeof band === 'number'
      ? `[${band}]`
      : `[${band.join(',')}]`.join(', ');
  });
}

const ModeContainer = withProps(
  { func: calculate_mode }
)(BaseStats(ModeComponent));

export default ModeContainer;

