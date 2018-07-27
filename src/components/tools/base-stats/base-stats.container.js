import { setResults } from '../../../actions/results-actions';
import { showAlert } from '../../../actions/alert-actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  results: state.results,
  raster: state.raster,
  geometry: state.geometry
});

const execute = (raster, geometry, func) => {
  let geojson = geometry.toGeoJSON();
  let results = func(raster, geojson);
  return setResults(results);
}

const mapDispatchToProps = dispatch => {
  return {
    execute: (raster, geometry, func) => {
      if (!raster) {
        dispatch(showAlert('Please make sure a geotiff is loaded before running this tool. You can load a geotiff using the Load Tool."'));
        return;
      }
      if (!geometry) {
        dispatch(showAlert('Please draw an area of interest or import a GeoJSON file before running this tool.'));
        return;
      }
      dispatch(execute(raster, geometry, func));
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
