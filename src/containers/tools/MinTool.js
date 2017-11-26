import gio from '@geotiff/gio';
import BaseAreaTool from './BaseAreaTool';
import MinToolComponent from '../../components/tools/MinToolComponent';
import { withProps } from 'recompose';

const calculate_min = (raster, coors) => {
    return gio.min(raster, coors)
        .map(value => value.toFixed(2)).join(', ');
}

const MinTool = withProps(
    { func: calculate_min }
)(BaseAreaTool(MinToolComponent));

export default MinTool;