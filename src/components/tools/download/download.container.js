import DownloadComponent from './download.component';
import FileSaver from 'file-saver';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { clear_results } from '../../../actions/results-actions';

const mapStateToProps = state => ({ raster: state.raster });

const download = raster => {
  FileSaver.saveAs(new Blob([raster._arrayBuffer]), 'download.tiff');
}

const DownloadContainer = compose(
  connect(mapStateToProps),
  withHandlers({ download })
)(DownloadComponent);

export default DownloadContainer;
