import geoblaze from 'geoblaze';
import RasterCalculatorComponent from './raster-calculator.component';
import { add_raster_from_georaster } from '../../../actions/raster-actions';
import { start_loading, stop_loading } from '../../../actions/loading-actions';
import { show_alert } from '../../../actions/alert-actions';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

const mapStateToProps = state => ({
  raster: state.raster
});

const mapDispatchToProps = dispatch => ({
  run_raster_calculator: (raster, raster_calculator) => {
    if (!raster) return dispatch(show_alert('Please add a raster before running this tool.'));
    if (!raster_calculator) return dispatch(show_alert('Please add a raster calculator operation before running this tool.'));
    try {
      dispatch(start_loading('Running Raster Calculator'));
      console.log("raster_calculator:", raster_calculator);
      return geoblaze.rasterCalculator(raster, raster_calculator).then(new_raster => {
        dispatch(stop_loading());
        dispatch(add_raster_from_georaster(new_raster));
      });
    } catch(e) {
      dispatch(stop_loading());
      dispatch(show_alert('Geotiff was unable to complete the operation. Please make sure you are using a multi-band raster and a valid arithmetic operation'));
    }
  }
});

const RasterCalculatorContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('raster_calculator', 'set_raster_calculator', ''),
  withHandlers({
    update_raster_calculator: ({ set_raster_calculator }) => event => {
      return set_raster_calculator(event.target.value);
    },
    execute: ({ raster, raster_calculator, run_raster_calculator }) => () => {
      return run_raster_calculator(raster, raster_calculator);
    }
  })
)(RasterCalculatorComponent);

export default RasterCalculatorContainer;
