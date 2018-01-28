import geoblaze from 'geoblaze';
import BaseStats from '../base-stats';
import MedianComponent from './median.component';
import { withProps } from 'recompose';

const calculate_median = (raster, coors) => {
    return geoblaze.median(raster, coors)
        .map(value => value.toFixed(2)).join(', ');
}

const MedianContainer = withProps(
    { func: calculate_median }
)(BaseStats(MedianComponent));

export default MedianContainer;
