import React, { Component } from 'react';
import gio from '@geotiff/gio';
import Map from '../Map';

class IdentifyTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            button_text: 'Identify',
            value: '',
            marker: null
        };
        this.change_mode = this.change_mode.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        if (this.props.auto_start) {
            console.log("auto-starting Identify tool");
            this.change_mode(true);
        }
    }

    change_mode(force) {
        if (this.state.button_text === 'Identify') {
            this.props.lose_focus();
            if (force || Map.georaster) {
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
            if (this.state.marker) Map.remove_layer(this.state.marker);
        }
    }

    listen(event_type, message) {
        if (event_type === 'map-click') {
            let point = [message.lng, message.lat];
            if (this.state.marker) Map.remove_layer(this.state.marker);
            let marker = Map.add_marker(message);
            let value = gio.identify(Map.georaster, point).join(', ');
            this.setState({ value, marker });
        }
    }

    close() {
        this.props.on_remove();
        if (this.state.marker) {
            Map.remove_layer(this.state.marker);
            Map.unsubscribe(this);
            this.setState({ marker: null });
        }
    }

    render() {
        return (
            <div id='identify-tool' className='tool'>
                <section className='controls'>
                    <header>
                        <i className='material-icons gt-remove' onClick={this.close}>clear</i>
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

export default IdentifyTool;
