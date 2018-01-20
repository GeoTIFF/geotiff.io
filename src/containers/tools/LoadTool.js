import LoadToolComponent from '../../components/tools/LoadToolComponent';
import { add_raster } from '../../actions/raster-actions';
import { unmount_tool } from '../../actions/active-tool-actions';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

// let url_to_tiff = new URLSearchParams(window.location.search).get("url");
// if (url_to_tiff) window.load_raster(url_to_tiff);

const mapDispatchToProps = dispatch => {
    return {
        add_raster: input => {
            console.error('adding...');
            dispatch(add_raster(input));
        },
        close: () => dispatch(unmount_tool())
    }
}

export const load_state = compose(
    connect(null, mapDispatchToProps),
    withState('url_input', 'set_url_input', ''),
    withState('file_input', 'set_file_input', ''),
    withHandlers({
        update_url_input: ({ set_url_input }) => event => {
            return set_url_input(event.target.value);
        },
        update_file_input: ({ set_file_input }) => event => {
            return set_file_input(event.target.files[0]);
        },
        load_raster: ({ url_input, file_input, add_raster }) => () => {
            return new Promise((resolve, reject) => {
                try {
                    if (url_input !== '') {
                        add_raster(url_input);
                        resolve(true);
                    } else if (file_input !== '') {
                        add_raster(file_input);
                        resolve(true);
                    } else {
                        alert('Please add either a url or a geotiff file');
                    }
                } catch (e) {
                    alert('The raster you tried to load is not a valid geotiff. Please try again with a different file.');
                    reject();
                }
            });
        }
    })
);

const LoadTool = compose(load_state)(LoadToolComponent)

export default LoadTool;
