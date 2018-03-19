import geoblaze from 'geoblaze';
import BaseStats from '../base-stats';
import ModeComponent from './mode.component';
import { withProps } from 'recompose';

const calculate_mode = (raster, coors) => {
  const modes = geoblaze.mode(raster, coors);
  return modes.map(band => {
    if (typeof band === 'number') return band;
    return band.join(", ");
  });
}

const ModeContainer = withProps(
  { func: calculate_mode }
)(BaseStats(ModeComponent));

export default ModeContainer;

