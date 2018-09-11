import IdentifyComponent from './identify.component';
import { startDrawing, stopDrawing } from '../../../actions/drawing-actions';
import { removeGeometry } from '../../../actions/geometry-actions';
import UrlService from '../../../services/UrlService';
import { connect } from 'react-redux';
import { compose, lifecycle, withState, withHandlers } from 'recompose';

let mapStateToProps = state => ({ results: state.results });

const stopAndRemoveGeometry = dispatch => {
  dispatch(removeGeometry());
  dispatch(stopDrawing());
}

let mapDispatchToProps = dispatch => {
  return {
    startDrawing: () => dispatch(startDrawing('point')),
    stopDrawing: () => stopAndRemoveGeometry(dispatch)
  }
}

let IdentifyContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('identifying', 'updateIdentifying', false),
  withHandlers({
    changeMode: props => () => {
      props.identifying ? props.stopDrawing() : props.startDrawing('point');
      return props.updateIdentifying(!props.identifying);
    }
  }),
  lifecycle({
    componentDidMount(props) {
      if (UrlService.get('auto_start')) {
        this.props.changeMode(props);
      }
    }
})
)(IdentifyComponent);

export default IdentifyContainer;
