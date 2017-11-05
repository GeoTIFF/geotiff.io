let React = require('react');

let L = window.L;

let gio = require('@geotiff/gio');

let Map = require('../Map');

let chroma = require("chroma-js");

let GeoRasterLayer = require("georaster-layer-for-leaflet");
console.log("GeoRasterLayer:", GeoRasterLayer);

let load_raster = (input) => {
    return new Promise(resolve => {
        gio.load(input).then(georaster => {
            try {
                Map.georaster = georaster;
                let options = {
                    georaster: georaster,
                    opacity: 0.7
                };
                let layer = new GeoRasterLayer(options);
                Map.add_raster_layer(layer);
                resolve();
            } catch (error) {
                console.error("error:", error);
            }
        });
    });
}


var url_to_tiff = new URLSearchParams(window.location.search).get("url");
console.log("URL:", url_to_tiff);
if (url_to_tiff) {
    load_raster(url_to_tiff);
}


class LoadTool extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
        this.change_input_from_url = this.change_input_from_url.bind(this);
        this.change_input_from_file = this.change_input_from_file.bind(this);
        this.load_raster = this.load_raster.bind(this);
    }

    componentDidMount() {
        console.log("mounted LOadTool");
    }

    change_input_from_url(event) {
        let input = event.target.value;
        this.setState({ input });
    }

    change_input_from_file(event) {
        let input = event.target.files[0];
        this.setState({ input });
    }

    load_raster() {
        let input = this.state.input;
        load_raster(input).then(() => {
            this.props.on_remove();
        });
    }

    render() {
        return (
            <div id='load-tool' className='tool'>
                <section className='controls'>
                    <header>
                        <i className='material-icons gt-remove' onClick={this.props.on_remove}>clear</i>
                        <h3 className='tool-title'>Load a GeoTIFF</h3>
                    </header>
                    <div className='content'>
                        <p className='tool-desc'>You have two ways to add a GeoTIFF to the map. Add a url or upload a file</p>
                        
                        <br />
                        <label htmlFor="basic-url">URL to Your GeoTIFF</label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="gt-input"
                                onChange={this.change_input_from_url}
                            />
                        </div>
                        <br />
                        <p className="or"><b>OR</b></p>
                        <label htmlFor="basic-url">Load File</label>
                        <div className="gt-input">
                            <input 
                                type="file"
                                onChange={this.change_input_from_file}
                            />
                        </div>
                        <br />
                        <button className='gt-button to-right' onClick={this.load_raster}>Load</button>
                    </div>
                </section>
            </div>
        )
    }
}

window.load_raster = load_raster;

module.exports = LoadTool;
