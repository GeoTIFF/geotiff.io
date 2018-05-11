import geoblaze from 'geoblaze';
import BandArithmeticComponent from './band-arithmetic.component';
import { add_raster_from_georaster } from '../../../actions/raster-actions';
import { start_loading, stop_loading } from '../../../actions/loading-actions';
import { show_alert } from '../../../actions/alert-actions';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

const mapStateToProps = state => ({
  raster: state.raster
});

const mapDispatchToProps = dispatch => ({
  run_band_arithmetic: (raster, band_arithmetic) => {
    if (!raster) return dispatch(show_alert('Please add a raster before running this tool.'));
    if (!band_arithmetic) return dispatch(show_alert('Please add an arithmetic operation before running this tool.'));
    try {
      dispatch(start_loading('Running Band Arithmetic'));
      return geoblaze.bandArithmetic(raster, band_arithmetic).then(new_raster => {
        dispatch(stop_loading());
        dispatch(add_raster_from_georaster(new_raster));
      });
    } catch(e) {
      dispatch(stop_loading());
      dispatch(show_alert('Geotiff was unable to complete the operation. Please make sure you are using a multi-band raster and a valid arithmetic operation'));
    }
  }
});

const BandArithmeticContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('band_arithmetic', 'set_band_arithmetic', ''),
  withHandlers({
    update_band_arithmetic: ({ set_band_arithmetic }) => event => {
      return set_band_arithmetic(event.target.value);
    },
    execute: ({ raster, band_arithmetic, run_band_arithmetic }) => () => {
      return run_band_arithmetic(raster, band_arithmetic);
    }
  })
)(BandArithmeticComponent);

export default BandArithmeticContainer;
