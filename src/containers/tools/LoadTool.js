import LoadToolComponent from '../../components/tools/LoadToolComponent';
import { add_raster } from '../../actions/raster-actions';
import { connect } from 'react-redux';

// let url_to_tiff = new URLSearchParams(window.location.search).get("url");
// if (url_to_tiff) window.load_raster(url_to_tiff);

const mapDispatchToProps = dispatch => {
    return {
        load_raster: input => dispatch(add_raster(input))
    }
}

const LoadTool = connect(
    null,
    mapDispatchToProps
)(LoadToolComponent);

export default LoadTool;