let React = require('react');

let L = window.L;

let gio = require('@geotiff/gio');

let Map = require('../Map');

let load_raster = (input) => {
	return new Promise(resolve => {
		gio.load(input).then(geotiff => {
			Map.tiff = geotiff;
			Map.image = geotiff.getImage();
			let buffer = Map.image.dataView.buffer;
			let s = L.ScalarField.fromGeoTIFF(buffer);
	        let layer = L.canvasLayer.scalarField(s);
	        Map.add_layer(layer);
	        resolve();
		});
	});
}

class LoadTool extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			input: ''
		}
		this.change_input_from_url = this.change_input_from_url.bind(this);
		this.change_input_from_file = this.change_input_from_file.bind(this);
		this.load_raster = this.load_raster.bind(this);
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
		                <p class="or"><b>OR</b></p>
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