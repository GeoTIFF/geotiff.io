import geoblaze from 'geoblaze';
import BaseStats from '../base-stats';
import MinComponent from './min.component';
import { withProps } from 'recompose';

const calculate_min = (raster, coors) => {
    return geoblaze.min(raster, coors)
        .map(value => value.toFixed(2)).join(', ');
}

const MinContainer = withProps(
    { func: calculate_min }
)(BaseStats(MinComponent));

export default MinContainer;
