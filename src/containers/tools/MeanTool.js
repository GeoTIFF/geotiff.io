import gio from '@geotiff/gio';
import MeanToolComponent from '../../components/tools/MeanToolComponent';
import { set_results } from '../../actions/results-actions';
import { unmount_tool } from '../../actions/active-tool-actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ 
    results: state.results, 
    raster: state.raster, 
    geometry: state.geometry  
});

const calculate_mean = (raster, geometry) => {
    let geojson = geometry.toGeoJSON();
    let coors = geojson.geometry.coordinates;
    let mean = gio.mean(raster, coors)
        .map(value => value.toFixed(2)).join(', ');
    return set_results(mean);
}

const mapDispatchToProps = dispatch => {
    return {
        execute: (raster, geometry) => dispatch(calculate_mean(raster, geometry)),
        close: () => dispatch(unmount_tool())
    }
}

const MeanTool = connect(
    mapStateToProps,
    mapDispatchToProps
)(MeanToolComponent);


export default MeanTool;