import DrawGeometryComponent from '../../components/shared/DrawGeometryComponent';
import { start_drawing } from '../../actions/drawing-actions';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
        draw: format => dispatch(start_drawing(format))
    }
}

const DrawGeometry = connect(
    null,
    mapDispatchToProps
)(DrawGeometryComponent);

export default DrawGeometry;