import IdentifyComponent from './identify.component';
import geoblaze from 'geoblaze';
import { start_drawing, stop_drawing } from '../../../actions/drawing-actions';
import { add_geometry, remove_geometry } from '../../../actions/geometry-actions';
import { set_results } from '../../../actions/results-actions';
import { unmount_tool } from '../../../actions/active-tool-actions';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

let mapStateToProps = state => ({ results: state.results });

const stop_and_remove_geometry = dispatch => {
    dispatch(remove_geometry());
    dispatch(stop_drawing());
}

let mapDispatchToProps = dispatch => {
    return {
        close: () => {
            stop_and_remove_geometry(dispatch);
            dispatch(unmount_tool());
        },
        start_drawing: () => dispatch(start_drawing('point')),
        stop_drawing: () => stop_and_remove_geometry(dispatch)
    }
}

let IdentifyContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withState('identifying', 'update_identifying', false),
    withHandlers({
        change_mode: props => () => {
            props.identifying ? props.stop_drawing() : props.start_drawing('point');
            return props.update_identifying(!props.identifying);
        }
    })
)(IdentifyComponent);

export default IdentifyContainer;
