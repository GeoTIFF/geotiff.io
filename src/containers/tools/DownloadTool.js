import DownloadToolComponent from '../../components/tools/DownloadToolComponent';
import FileSaver from 'file-saver';
import { unmount_tool } from '../../actions/active-tool-actions';
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

const DownloadTool = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({ download })
)(DownloadToolComponent);

export default DownloadTool;