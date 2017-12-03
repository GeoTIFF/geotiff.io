import gio from '@geotiff/gio';
import BaseStatsTool from './BaseStatsTool';
import MeanToolComponent from '../../components/tools/MeanToolComponent';
import { withProps } from 'recompose';

const calculate_mean = (raster, coors) => {
    return gio.mean(raster, coors)
        .map(value => value.toFixed(2)).join(', ');
}

const MeanTool = withProps(
    { func: calculate_mean }
)(BaseStatsTool(MeanToolComponent));

export default MeanTool;