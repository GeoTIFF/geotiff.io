import geoblaze from 'geoblaze';
import BaseStats from '../base-stats';
import MedianComponent from './median.component';
import { withProps } from 'recompose';

const calculateMedian = (raster, coors) => {
  return geoblaze.median(raster, coors)
    .map(value => value.toFixed(2)).join(', ');
}

const MedianContainer = withProps(
  { func: calculateMedian }
)(BaseStats(MedianComponent));

export default MedianContainer;
