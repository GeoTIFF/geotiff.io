let React = require('react');

let gio = require('@geotiff/gio');

let Map = require('../Map');

let FileSaver = require('file-saver');

class DownloadTool extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            button_text: 'Download GeoTIFF',
            filename: "downloaded.tiff",
            value: '',
            marker: null
        };
        this["download"] = this["download"].bind(this);
    }

    download() {
        FileSaver.saveAs(new Blob([Map.georaster._arrayBuffer]), this.state.filename);
    }

    render() {
        return (
            <div id='download-tool' className='tool'>
                <section className='controls'>
                    <header>
                        <i className='material-icons gt-remove' onClick={this.props.on_remove}>clear</i>
                        <h3 className='tool-title'>Download the GeoTIFF</h3>
                    </header>
                    <div className='content'>
                        <p>Download the GeoTIFF displayed on the map</p>
                        <button 
                            className='gt-button'
                            onClick={this.download}
                        >
                            {this.state.button_text}
                        </button>
                    </div>
                </section>
           </div>
        )
    }
}

module.exports = DownloadTool;
