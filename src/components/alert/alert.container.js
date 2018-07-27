import { connect } from 'react-redux';
import { hideAlert } from '../../actions/alert-actions';
import AlertComponent from './alert.component';

const mapStateToProps = ({ alert }) => ({ alert });

const mapDispatchToProps = dispatch => {
  return {
    hideAlert: () => dispatch(hideAlert())
  }
}

const AlertContainer = connect(mapStateToProps, mapDispatchToProps)(AlertComponent);

export default AlertContainer;
