import gio from '@geotiff/gio';
import BaseAreaTool from './BaseAreaTool';
import MeanToolComponent from '../../components/tools/MeanToolComponent';
import { withProps } from 'recompose';

const calculate_mean = (raster, coors) => {
    return gio.mean(raster, coors)
        .map(value => value.toFixed(2)).join(', ');
}

const MeanTool = withProps(
    { func: calculate_mean }
)(BaseAreaTool(MeanToolComponent));

export default MeanTool;