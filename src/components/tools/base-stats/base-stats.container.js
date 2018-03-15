import { set_results } from '../../../actions/results-actions';
import { show_alert } from '../../../actions/alert-actions';
import { clear_results } from '../../../actions/results-actions';
import { remove_geometry } from '../../../actions/geometry-actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  results: state.results,
  raster: state.raster,
  geometry: state.geometry
});

const execute = (raster, geometry, func) => {
  let geojson = geometry.toGeoJSON();
  let results = func(raster, geojson);
  return set_results(results);
}

const mapDispatchToProps = dispatch => {
  return {
    execute: (raster, geometry, func) => {
      if (!raster) {
        dispatch(show_alert('Please make sure a geotiff is loaded before running this tool. You can load a geotiff using the Load Tool."'));
        return;
      }
      if (!geometry) {
        dispatch(show_alert('Please draw an area of interest or import a GeoJSON file before running this tool.'));
        return;
      }
      dispatch(execute(raster, geometry, func));
    },
    close: () => {
      dispatch(clear_results());
      dispatch(remove_geometry());
    }
  }
}

const BaseStatsContainer = component => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);
}

export default BaseStatsContainer;
