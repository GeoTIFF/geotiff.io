import IdentifyToolComponent from '../../components/tools/IdentifyToolComponent';
import gio from '@geotiff/gio';
import { start_drawing, stop_drawing } from '../../actions/drawing-actions';
import { add_geometry } from '../../actions/geometry-actions';
import { set_results } from '../../actions/results-actions';
import { unmount_tool } from '../../actions/active-tool-actions';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

let mapStateToProps = state => ({ results: state.results });

let mapDispatchToProps = dispatch => {
    return {
        close: () => dispatch(unmount_tool()),
        start_drawing: () => dispatch(start_drawing('point')),
        stop_drawing: () => dispatch(stop_drawing())
    }
}

let IdentifyTool = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withState('identifying', 'update_identifying', false),
    withHandlers({
        change_mode: props => () => {
            props.identifying ? props.stop_drawing() : props.start_drawing('point');
            return props.update_identifying(!props.identifying);
        }
    })
)(IdentifyToolComponent);

export default IdentifyTool;