let React = require('react');

let gio = require('@geotiff/gio');

let Map = require('../Map');

class IdentifyTool extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			button_text: 'Identify',
			value: '',
			marker: null
		}
		this.change_mode = this.change_mode.bind(this);
	}

	change_mode() {
		if (this.state.button_text === 'Identify') {
			if (Map.tiff) {
				this.setState({ button_text: 'Stop Identifying' });
				Map.subscribe(this);
			} else {
				alert('Please load a GeoTIFF on the Map');
			}	
		} else {
			this.setState({ 
				button_text: 'Identify',
				value: ''
			});
			Map.unsubscribe(this);
			if (this.state.marker) Map.remove_marker(this.state.marker);
		}
	}

	listen(event_type, message) {
		if (event_type === 'map-click') {
			let point = [message.lng, message.lat];
			if (this.state.marker) Map.remove_marker(this.state.marker);
			let marker = Map.add_marker(message);
			this.setState({ 
				value: gio.identify(Map.image, point),
				marker
			});
		}
	}

	render() {
		return (
			<div id='identify-tool' className='tool'>
				<section className='controls'>
					<header>
						<i className='material-icons gt-remove' onClick={this.props.on_remove}>clear</i>
						<h3 className='tool-title'>Identify a Pixel Value</h3>
					</header>
					<div className='content'>
						<p>Click a point on the map to identify the pixel value</p>
						<button 
							className='gt-button'
							onClick={this.change_mode}
						>
							{this.state.button_text}
						</button>
					</div>
				</section>
				{
					this.state.button_text === 'Stop Identifying'
					? 
						<section className='results'>
							<h3>Pixel Value: { this.state.value }</h3>
						</section>
					: ''
				}
			</div>
		)
	}
}

module.exports = IdentifyTool;