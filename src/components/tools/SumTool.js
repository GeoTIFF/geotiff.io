import React, { Component } from 'react';
import gio from '@geotiff/gio';
import Map from '../Map';
import ImportGeoJSON from '../shared/ImportGeoJSON';

class SumTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            layer: null,
            draw_mode: 'none'
        };
        this.draw_rectangle = this.draw_rectangle.bind(this);
        this.draw_polygon = this.draw_polygon.bind(this);
        this.close = this.close.bind(this);
        this.add_geojson = this.add_geojson.bind(this);
    }

    componentWillMount() {
        Map.subscribe(this);
    }

    componentWillUnmount() {
        Map.unsubscribe(this);
    }

    draw_rectangle() {
        this.props.lose_focus();
        if (Map.georaster) {
            this.setState({ draw_mode: 'rectangle' });
            Map.start_draw_rectangle();
        } else {
            alert('Please load a GeoTIFF on the Map');
        }
    }

    draw_polygon() {
        this.props.lose_focus();
        if (Map.georaster) {
            this.setState({ draw_mode: 'polygon' });
            Map.start_draw_polygon();
        } else {
            alert('Please load a GeoTIFF on the Map');
        }
    }

    listen(event_type, message) {
        if (event_type === 'rectangle' || event_type === 'polygon') {
            if (this.state.layer) {
                Map.remove_layer(this.state.layer);
            }
            let layer = message.layer;
            Map.add_layer(layer);

            let value;
            if (event_type === 'rectangle') {
                let latlngs = layer.getBounds();
                let coors = [latlngs.getWest(), latlngs.getSouth(), latlngs.getEast(), latlngs.getNorth()];
                Map.stop_draw_rectangle();
                try { 
                    value = gio.sum(Map.georaster, coors)
                        .map(value => value.toFixed(2)).join(', ');
                } catch(e) {
                    alert('An unexpected error occurred when trying to run the calculation using this geometry. Please use a different geometry.');
                }
                
            } else {
                let geojson = layer.toGeoJSON();
                let coors = geojson.geometry.coordinates;
                Map.stop_draw_polygon();
                try { 
                    value = gio.sum(Map.georaster, coors)
                        .map(value => value.toFixed(2)).join(', ');
                } catch(e) {
                    alert('An unexpected error occurred when trying to run the calculation using this geometry. Please use a different geometry.');
                }
            }

            let draw_mode = 'none';
            this.setState({ value, layer, draw_mode });
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

    add_geojson(geojson) {
        if (this.state.layer) {
            Map.remove_layer(this.state.layer);
        }
        let value = gio.sum(Map.georaster, geojson);
        let draw_mode = 'none';
        let layer = Map.create_geojson_layer(geojson);
        Map.add_layer(layer);
        this.setState({ value, draw_mode, layer });
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
                        <div className='content-row'>
                            <button 
                                className={`gt-button ${this.state.draw_mode === 'rectangle' ? 'active' : '' }`}
                                onClick={this.draw_rectangle}
                            >
                                Draw Rectangle
                            </button>
                            <button
                                className={`gt-button ${this.state.draw_mode === 'polygon' ? 'active' : '' }`}
                                onClick={this.draw_polygon}
                            >
                                Draw Polygon
                            </button>
                        </div>
                        <p className="or"><b>OR</b></p>
                        <p>Add GeoJSON. You can either import a GeoJSON file or write it out yourself.</p>
                        <ImportGeoJSON add_geojson={this.add_geojson} />
                    </div>
                </section>
                {
                    this.state.value !== null
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

export default SumTool;
