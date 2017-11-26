import gio from '@geotiff/gio';
import BaseStatsTool from './BaseStatsTool';
import SumToolComponent from '../../components/tools/SumToolComponent';
import { withProps } from 'recompose';

const calculate_sum = (raster, coors) => {
    return gio.sum(raster, coors)
        .map(value => value.toFixed(2)).join(', ');
}

const SumTool = withProps(
    { func: calculate_sum }
)(BaseStatsTool(SumToolComponent));

export default SumTool;