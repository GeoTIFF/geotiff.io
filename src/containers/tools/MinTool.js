import gio from '@geotiff/gio';
import BaseStatsTool from './BaseStatsTool';
import MinToolComponent from '../../components/tools/MinToolComponent';
import { withProps } from 'recompose';

const calculate_min = (raster, coors) => {
    return gio.min(raster, coors)
        .map(value => value.toFixed(2)).join(', ');
}

const MinTool = withProps(
    { func: calculate_min }
)(BaseStatsTool(MinToolComponent));

export default MinTool;