import gio from '@geotiff/gio';
import BaseStatsTool from './BaseStatsTool';
import MaxToolComponent from '../../components/tools/MaxToolComponent';
import { withProps } from 'recompose';

const calculate_max = (raster, coors) => {
    return gio.max(raster, coors)
        .map(value => value.toFixed(2)).join(', ');
}

const MaxTool = withProps(
    { func: calculate_max }
)(BaseStatsTool(MaxToolComponent));

export default MaxTool;