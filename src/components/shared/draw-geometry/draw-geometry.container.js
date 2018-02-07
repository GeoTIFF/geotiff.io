import DrawGeometryComponent from './draw-geometry.component';
import { start_drawing } from '../../../actions/drawing-actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ drawing: state.drawing });

const mapDispatchToProps = dispatch => {
    return {
        draw: format => dispatch(start_drawing(format))
    }
}

const DrawGeometryContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawGeometryComponent);

export default DrawGeometryContainer;
