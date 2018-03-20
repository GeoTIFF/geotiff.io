import LoadComponent from './load.component';
import { add_raster } from '../../../actions/raster-actions';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import { show_alert } from '../../../actions/alert-actions';

// let url_to_tiff = new URLSearchParams(window.location.search).get("url");
// if (url_to_tiff) window.load_raster(url_to_tiff);

const urlIsValid = url => {
  return /^http|^https/.test(url);
}

const mapDispatchToProps = dispatch => {
  return {
    show_alert: message => dispatch(show_alert(message)),
    add_raster: input => dispatch(add_raster(input))
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
    load_raster: ({ url_input, file_input, add_raster, show_alert }) => () => {
      return new Promise((resolve, reject) => {
        try {
          if (url_input !== '' ) {
            if (urlIsValid(url_input)) {
              add_raster(url_input);
              resolve(true);
            } else {
              show_alert('Please make sure you are using a valid url. It must start with either http or https.');
            }
          } else if (file_input !== '') {
            add_raster(file_input);
            resolve(true);
          } else {
            show_alert('Please add either a url or a geotiff file');
          }
        } catch (e) {
          show_alert('The raster you tried to load is not a valid geotiff. Please try again with a different file.');
          reject();
        }
      });
    }
  })
);

const LoadContainer = compose(load_state)(LoadComponent)

export default LoadContainer;
