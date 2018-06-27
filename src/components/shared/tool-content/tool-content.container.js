import { connect } from 'react-redux';
import ToolContentComponent from './tool-content.component';

const mapStateToProps = state => {
  return {
    menuFocus: state.menuFocus
  }
};

const ToolContentContainer = connect(mapStateToProps)(ToolContentComponent);

export default ToolContentContainer;
