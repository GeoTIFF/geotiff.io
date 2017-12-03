import HistogramToolComponent from '../../components/tools/HistogramToolComponent';
import gio from '@geotiff/gio';
import _ from 'underscore';
import { unmount_tool } from '../../actions/active-tool-actions';
import { set_results } from '../../actions/results-actions';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

const mapStateToProps = state => { 
    return {
        results: state.results,
        drawing: state.drawing,
        geometry: state.geometry,
        raster: state.raster
    }
};

const mapDispatchToProps = dispatch => {
    return {
        close: () => dispatch(unmount_tool()),
        get_histogram: (raster, geometry, options) => {
            return dispatch(get_histogram(raster, geometry, options))
        }
    }
}

const get_histogram = (raster, geometry, options) => {
    let { scale_type, num_classes, class_type } = options;

    // make sure parameters are valid
    if (num_classes % 1 !== 0) {
        alert('Please make sure the number of classes is an integer.');
        return;
    }
    if (!geometry) {
        alert('Please make sure to select a geography to run the tool on.');
        return;
    }

    // convert to list because react doesn't like storing objects in state
    let geojson = geometry.toGeoJSON();
    let results_objs = gio.histogram(raster, geojson, options);
    let results_lists = results_objs.map(band_results => {
        return _.keys(band_results).map(bin => [bin, band_results[bin]]);
    });

    // sort results
    let results;
    if (scale_type === 'nominal') {
        results = results_lists.map(results_list => {
            return _.sortBy(results_list, bin => Number(bin[0]));
        });
    } else {
        results = results_lists.map(results_list => {
            return _.sortBy(results_list, bin => Number(bin[0].split('- ')[1]));
        });
    }
    return set_results(results);
}

const HistogramTool = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withState('scale_type', 'set_scale_type', 'ratio'),
    withState('num_classes', 'set_num_classes', 3),
    withState('class_type', 'set_class_type', 'equal-interval'),
    withHandlers({
        update_scale_type: ({ set_scale_type }) => event => {
            return set_scale_type(event.target.value);
        },
        update_num_classes: ({ set_num_classes }) => event => {
            return set_num_classes(event.target.value);
        },
        update_class_type: ({ set_class_type }) => event => {
            return set_class_type(event.target.value);
        },
        execute: ({ 
            raster, geometry, scale_type, num_classes, class_type, get_histogram
        }) => () => {
            return get_histogram(raster, geometry, { scale_type, num_classes, class_type });
        }
    })
)(HistogramToolComponent);

export default HistogramTool;