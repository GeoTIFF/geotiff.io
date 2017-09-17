let React = require('react');

let gio = require('@geotiff/gio');
let Map = require('../Map');

class SumTool extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            layer: null
        };
        this.draw_rectangle = this.draw_rectangle.bind(this);
        this.close = this.close.bind(this);
    }

    componentWillMount() {
        Map.subscribe(this);
    }

    componentWillUnmount() {
        Map.unsubscribe(this);
    }

    draw_rectangle() {
        this.props.lose_focus();
        if (Map.tiff) {
            Map.start_draw_rectangle();
        } else {
            alert('Please load a GeoTIFF on the Map');
        }
        
    }

    listen(event_type, message) {
        if (this.state.layer) Map.remove_layer(this.state.layer);
        if (event_type === 'rectangle') {
            let layer = message.layer;
            let latlngs = layer.getBounds();
            Map.add_layer(layer);
            let coors = [latlngs.getWest(), latlngs.getSouth(), latlngs.getEast(), latlngs.getNorth()];
            let value = gio.sum(Map.image, coors).toFixed(2);
            this.setState({ value, layer });
            Map.stop_draw_rectangle();
        }
    }

    close() {
        if (this.state.layer) {
            Map.remove_layer(this.state.layer);
            Map.unsubscribe(this);
            this.setState({ layer: null });
        }
        this.props.on_remove();
    }

    render() {
        return (
            <div id='sum-tool' className='tool'>
                <section className='controls'>
                    <header>
                        <i className='material-icons gt-remove' onClick={this.close}>clear</i>
                        <h3 className='tool-title'>Get the Sum Pixel Value of an Area</h3>
                    </header>
                    <div className='content'>
                        <p>Select a geometry type and draw a geometry to get the sum of the pixels within that area.</p>
                        <button 
                            className='gt-button'
                            onClick={this.draw_rectangle}
                        >
                            Rectangle
                        </button>
                    </div>
                </section>
                {
                    this.state.value
                    ? 
                        <section className='results'>
                            <h3>Sum: { this.state.value }</h3>
                        </section>
                    : ''
                }
            </div>
        )
    }
}

module.exports = SumTool;