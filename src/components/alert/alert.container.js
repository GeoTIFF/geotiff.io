import { connect } from 'react-redux';
import { compose } from 'recompose';
import { hide_alert } from '../../actions/alert-actions';
import AlertComponent from './alert.component';

const mapStateToProps = ({ alert }) => ({ alert });

const mapDispatchToProps = dispatch => {
  return {
    hide_alert: () => dispatch(hide_alert())
  }
}

const AlertContainer = connect(mapStateToProps, mapDispatchToProps)(AlertComponent);

export default AlertContainer;
