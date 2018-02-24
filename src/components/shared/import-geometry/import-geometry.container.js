import ImportGeometryComponent from './import-geometry.component';
import { add_geometry } from '../../../actions/geometry-actions';
import { show_alert } from '../../../actions/alert-actions';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

const add_geojson = geojson => {
  let geometry = JSON.parse(geojson);
  return add_geometry(geometry, 'geojson');
}

const is_json_str = json => {
  try {
    JSON.parse(json);
  } catch(e) {
    return false;
  }
  return true;
}

const import_geojson = event => {
  return new Promise((resolve, reject) => {
    let file = event.target.files[0];
    let file_reader = new FileReader();
    file_reader.onload = evt => {
      let geojson = evt.target.result;
      if (is_json_str(geojson)) {
        resolve(geojson);
      } else {
        reject(new Error('File could not be uploaded. Please make sure to upload a valid JSON file'));
      }
    }
    file_reader.readAsText(file);
  });
}

const mapDispatchToProps = dispatch => {
  return {
    show_alert: message => dispatch(show_alert(message)),
    add_geojson: geojson => dispatch(add_geojson(geojson))
  }
}

const ImportGeometryContainer = compose(
  connect(null, mapDispatchToProps),
  withState('geometry', 'update_geometry', ''),
  withHandlers({
    import_geometry: ({ update_geometry, add_geojson, show_alert }) => event => {
      import_geojson(event).then(geometry => {
        update_geometry(geometry);
        add_geojson(geometry);
      }, error => {
        show_alert(error.message);
      });
    }
  })
)(ImportGeometryComponent);

export default ImportGeometryContainer;
