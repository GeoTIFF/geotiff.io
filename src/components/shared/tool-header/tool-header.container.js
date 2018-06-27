import { connect } from 'react-redux';
import ToolHeaderComponent from './tool-header.component';
import { focusMenu } from '../../../actions/menu-focus-actions';
import { stopDrawing } from '../../../actions/drawing-actions';
import { clearResults } from '../../../actions/results-actions';
import { removeGeometry } from '../../../actions/geometry-actions';

const mapDispatchToProps = dispatch => {
  return {
    close: () => {
      dispatch(stopDrawing());
      dispatch(clearResults());
      dispatch(removeGeometry());
    },
    focus: () => dispatch(focusMenu())
  }
}

const ToolHeaderContainer = connect(
  null, mapDispatchToProps
)(ToolHeaderComponent);

export default ToolHeaderContainer;
