import { connect } from 'react-redux';
import ToolContentComponent from './tool-content.component';

const mapStateToProps = state => {
  return {
    menu_focus: state.menu_focus
  }
};

const ToolContentContainer = connect(mapStateToProps)(ToolContentComponent);

export default ToolContentContainer;
