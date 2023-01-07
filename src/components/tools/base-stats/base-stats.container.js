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
  console.log(raster);
  console.log(geojson);
  console.log(results);
  return results.then(
    (data) => {
      console.log(data);
      return setResults(data)
    },
    (err) => {
      console.log("error", err);
    }
  );
  
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
      console.log(execute(raster, geometry, func));
      execute(raster, geometry, func).then(
        (data) => {
          console.log(data);
          return dispatch(data);
        },
        (err) => {
          console.log("error", err);
        }
      );
      
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
