import DrawGeometryComponent from '../../components/shared/DrawGeometryComponent';
import { start_drawing } from '../../actions/drawing-actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ drawing: state.drawing });

const mapDispatchToProps = dispatch => {
    return {
        draw: format => dispatch(start_drawing(format))
    }
}

const DrawGeometry = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawGeometryComponent);

export default DrawGeometry;