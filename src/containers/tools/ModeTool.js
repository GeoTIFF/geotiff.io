import gio from '@geotiff/gio';
import BaseAreaTool from './BaseAreaTool';
import ModeToolComponent from '../../components/tools/ModeToolComponent';
import { withProps } from 'recompose';

const calculate_mode = (raster, coors) => {
    let result = gio.mode(raster, coors);
    return result.map(band => {
        return typeof band === 'number'
            ? `[${band}]`
            : `[${band.join(',')}]`.join(', ');
    });
}

const ModeTool = withProps(
    { func: calculate_mode }
)(BaseAreaTool(ModeToolComponent));

export default ModeTool;
