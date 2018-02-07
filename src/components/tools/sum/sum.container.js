import geoblaze from 'geoblaze';
import BaseStats from '../base-stats';
import SumComponent from './sum.component';
import { withProps } from 'recompose';

const calculate_sum = (raster, coors) => {
    return geoblaze.sum(raster, coors)
        .map(value => value.toFixed(2)).join(', ');
}

const SumContainer = withProps(
    { func: calculate_sum }
)(BaseStats(SumComponent));

export default SumContainer;
