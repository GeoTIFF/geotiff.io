import LoadComponent from './load.component';
import { addRaster } from '../../../actions/raster-actions';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import { showAlert } from '../../../actions/alert-actions';

// let urlToTiff = new URLSearchParams(window.location.search).get("url");
// if (urlToTiff) window.loadRaster(urlToTiff);

const urlIsValid = url => {
  return /^http|^https/.test(url);
}

const mapDispatchToProps = dispatch => {
  return {
    showAlert: message => dispatch(showAlert(message)),
    addRaster: input => dispatch(addRaster(input))
  }
}

export const loadState = compose(
  connect(null, mapDispatchToProps),
  withState('urlInput', 'setURLInput', ''),
  withState('fileInput', 'setFileInput', ''),
  withHandlers({
    updateURLInput: ({ setURLInput }) => event => {
      return setURLInput(event.target.value.trim());
    },
    updateFileInput: ({ setFileInput }) => event => {
      return setFileInput(event.target.files[0]);
    },
    loadRaster: ({ urlInput, fileInput, addRaster, showAlert }) => () => {
      return new Promise((resolve, reject) => {
        try {
          if (urlInput !== '' ) {
            if (urlIsValid(urlInput)) {
              addRaster(urlInput);
              resolve(true);
            } else {
              showAlert('Please make sure you are using a valid url. It must start with either http or https.');
            }
          } else if (fileInput !== '') {
            addRaster(fileInput);
            resolve(true);
          } else {
            showAlert('Please add either a url or a geotiff file');
          }
        } catch (e) {
          showAlert('The raster you tried to load is not a valid geotiff. Please try again with a different file.');
          reject();
        }
      });
    }
  })
);

const LoadContainer = compose(loadState)(LoadComponent)

export default LoadContainer;
