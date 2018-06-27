import geoblaze from 'geoblaze';
import BandArithmeticComponent from './band-arithmetic.component';
import { addRasterFromGeoraster } from '../../../actions/raster-actions';
import { startLoading, stopLoading } from '../../../actions/loading-actions';
import { showAlert } from '../../../actions/alert-actions';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

const mapStateToProps = state => ({
  raster: state.raster
});

const mapDispatchToProps = dispatch => ({
  runBandArithmetic: (raster, bandArithmetic) => {
    if (!raster) return dispatch(showAlert('Please add a raster before running this tool.'));
    if (!bandArithmetic) return dispatch(showAlert('Please add an arithmetic operation before running this tool.'));
    try {
      dispatch(startLoading('Running Band Arithmetic'));
      return geoblaze.bandArithmetic(raster, bandArithmetic).then(newRaster => {
        dispatch(stopLoading());
        dispatch(addRasterFromGeoraster(newRaster));
      });
    } catch(e) {
      dispatch(stopLoading());
      dispatch(showAlert('Geotiff was unable to complete the operation. Please make sure you are using a multi-band raster and a valid arithmetic operation'));
    }
  }
});

const BandArithmeticContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('bandArithmetic', 'setBandArithmetic', ''),
  withHandlers({
    updateBandArithmetic: ({ setBandArithmetic }) => event => {
      return setBandArithmetic(event.target.value);
    },
    execute: ({ raster, bandArithmetic, runBandArithmetic }) => () => {
      return runBandArithmetic(raster, bandArithmetic);
    }
  })
)(BandArithmeticComponent);

export default BandArithmeticContainer;
