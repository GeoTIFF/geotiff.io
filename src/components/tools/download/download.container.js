import DownloadComponent from './download.component';
import FileSaver from 'file-saver';
import { unmount_tool } from '../../../actions/active-tool-actions';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

const mapStateToProps = state => ({ raster: state.raster });

const mapDispatchToProps = dispatch => {
    return {
        close: () => dispatch(unmount_tool()),
    }
}

const download = raster => {
    FileSaver.saveAs(new Blob([raster._arrayBuffer]), 'download.tiff');
}

const DownloadContainer = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({ download })
)(DownloadComponent);

export default DownloadContainer;
