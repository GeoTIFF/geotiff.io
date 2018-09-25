import ImportGeometryComponent from './import-geometry.component';
import { addGeometry } from '../../../actions/geometry-actions';
import { showAlert } from '../../../actions/alert-actions';
import { unfocusMenu } from '../../../actions/menu-focus-actions';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

const addGeoJSON = geojson => {
  const geometry = JSON.parse(geojson);
  return addGeometry(geometry, 'geojson');
}

const isJSONStr = json => {
  try {
    JSON.parse(json);
  } catch(e) {
    return false;
  }
  return true;
}

const importGeojson = event => {
  return new Promise((resolve, reject) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = evt => {
      const geojson = evt.target.result;
      if (isJSONStr(geojson)) {
        resolve(geojson);
      } else {
        reject(new Error('File could not be uploaded. Please make sure to upload a valid JSON file'));
      }
    }
    fileReader.readAsText(file);
  });
}

const mapDispatchToProps = dispatch => {
  return {
    addGeoJSON: geojson => dispatch(addGeoJSON(geojson)),
    showAlert: message => dispatch(showAlert(message)),
    unfocusMenu: () => dispatch(unfocusMenu()),
  }
}

const ImportGeometryContainer = compose(
  connect(null, mapDispatchToProps),
  withState('geometry', 'updateGeometry', ''),
  withHandlers({
    importGeometry: ({ updateGeometry, addGeoJSON, showAlert }) => event => {
      importGeojson(event).then(geometry => {
        updateGeometry(geometry);
        addGeoJSON(geometry);
        unfocusMenu();
      }, error => {
        showAlert(error.message);
      });
    }
  })
)(ImportGeometryComponent);

export default ImportGeometryContainer;
