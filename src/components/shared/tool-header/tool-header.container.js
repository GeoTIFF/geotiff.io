import { connect } from 'react-redux';
import ToolHeaderComponent from './tool-header.component';
import { stop_drawing } from '../../../actions/drawing-actions';
import { clear_results } from '../../../actions/results-actions';
import { remove_geometry } from '../../../actions/geometry-actions';

const mapDispatchToProps = dispatch => {
  return {
    close: () => {
      dispatch(stop_drawing());
      dispatch(clear_results());
      dispatch(remove_geometry());
    }
  }
}

const ToolHeaderContainer = connect(
  null, mapDispatchToProps
)(ToolHeaderComponent);

export default ToolHeaderContainer;
