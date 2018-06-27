import geoblaze from 'geoblaze';
import RasterCalculatorComponent from './raster-calculator.component';
import { addRasterFromGeoraster } from '../../../actions/raster-actions';
import { startLoading, stopLoading } from '../../../actions/loading-actions';
import { showAlert } from '../../../actions/alert-actions';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

const mapStateToProps = state => ({
  raster: state.raster
});

const mapDispatchToProps = dispatch => ({
  runRasterCalculator: (raster, rasterCalculator) => {
    if (!raster) return dispatch(showAlert('Please add a raster before running this tool.'));
    if (!rasterCalculator) return dispatch(showAlert('Please add a raster calculator operation before running this tool.'));
    try {
      dispatch(startLoading('Running Raster Calculator'));
      return geoblaze.rasterCalculator(raster, rasterCalculator).then(newRaster => {
        dispatch(stopLoading());
        dispatch(addRasterFromGeoraster(newRaster));
      });
    } catch(e) {
      dispatch(stopLoading());
      dispatch(showAlert('Geotiff was unable to complete the operation. Please make sure you are using a multi-band raster and a valid arithmetic operation'));
    }
  }
});

const RasterCalculatorContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('rasterCalculator', 'setRasterCalculator', ''),
  withHandlers({
    updateRasterCalculator: ({ setRasterCalculator }) => event => {
      return setRasterCalculator(event.target.value);
    },
    execute: ({ raster, rasterCalculator, runRasterCalculator }) => () => {
      return runRasterCalculator(raster, rasterCalculator);
    }
  })
)(RasterCalculatorComponent);

export default RasterCalculatorContainer;
