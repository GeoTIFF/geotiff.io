import { set_results } from '../../../actions/results-actions';
import { unmount_tool } from '../../../actions/active-tool-actions';
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
    execute: (raster, geometry, func) => dispatch(execute(raster, geometry, func)),
    close: () => dispatch(unmount_tool())
  }
}

const BaseStatsContainer = component => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component);
}

export default BaseStatsContainer;
