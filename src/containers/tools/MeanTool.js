import gio from '@geotiff/gio';
import MeanToolComponent from '../../components/tools/MeanToolComponent';
import { set_results } from '../../actions/results-actions';
import { unmount_tool } from '../../actions/active-tool-actions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({ 
    results: state.results, 
    raster: state.raster, 
    geometry: state.geometry  
});

const calculate_mean = (raster, geometry) => {
    let mean = gio.mean(raster, geometry)
        .map(value => value.toFixed(2)).join(', ');
    return set_results(mean);
}

const mapDispatchToProps = dispatch => {
    return {
        execute: (raster, geometry) => dispatch(calculate_mean(raster, geometry)),
        close: () => dispatch(unmount_tool())
    }
}

const MeanTool = connect(
    mapStateToProps,
    mapDispatchToProps
)(MeanToolComponent);


export default MeanTool;

// class MeanTool extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             value: null,
//             layer: null,
//             draw_mode: 'none'
//         };
//         // this.draw_rectangle = this.draw_rectangle.bind(this);
//         // this.draw_polygon = this.draw_polygon.bind(this);
//         this.close = this.close.bind(this);
//         this.add_geojson = this.add_geojson.bind(this);
//     }

//     // componentWillMount() {
//     //     Map.subscribe(this);
//     // }

//     // componentWillUnmount() {
//     //     Map.unsubscribe(this);
//     // }

//     // draw_rectangle() {
//     //     this.props.lose_focus();
//     //     if (Map.georaster) {
//     //         this.setState({ draw_mode: 'rectangle' });
//     //         Map.start_draw_rectangle();
//     //     } else {
//     //         alert('Please load a GeoTIFF on the Map');
//     //     }
//     // }

//     // draw_polygon() {
//     //     this.props.lose_focus();
//     //     if (Map.georaster) {
//     //         this.setState({ draw_mode: 'polygon' });
//     //         Map.start_draw_polygon();
//     //     } else {
//     //         alert('Please load a GeoTIFF on the Map');
//     //     }
//     // }

//     listen(event_type, message) {
//         // if (event_type === 'rectangle' || event_type === 'polygon') {
//         //     if (this.state.layer) {
//         //         Map.remove_layer(this.state.layer);
//         //     }
//         //     let layer = message.layer;
//         //     Map.add_layer(layer);

//         //     let value;
//         //     if (event_type === 'rectangle') {
//         //         let latlngs = layer.getBounds();
//         //         let coors = [latlngs.getWest(), latlngs.getSouth(), latlngs.getEast(), latlngs.getNorth()];
//         //         Map.stop_draw_rectangle();
//         //         try {
//         //             value = gio.mean(Map.georaster, coors)
//         //                 .map(value => value.toFixed(2)).join(', ');
//         //         } catch(e) {
//         //             alert('An unexpected error occurred when trying to run the calculation using this geometry. Please use a different geometry.')
//         //         }
//         //     } else {
//         //         let geojson = layer.toGeoJSON();
//         //         let coors = geojson.geometry.coordinates;
//         //         Map.stop_draw_polygon();
//         //         try {
//         //             value = gio.mean(Map.georaster, geojson)
//         //                 .map(value => value.toFixed(2)).join(', ');
//         //         } catch(e) {
//         //             alert('An unexpected error occurred when trying to run the calculation using this geometry. Please use a different geometry.');
//         //         }
//         //     }

//         //     let draw_mode = 'none';
//         //     this.setState({ value, layer, draw_mode });
//         // }
//     }

//     close() {
//         // if (this.state.layer) {
//         //     Map.remove_layer(this.state.layer);
//         //     Map.unsubscribe(this);
//         //     this.setState({ layer: null });
//         // }
//         this.props.on_remove();
//     }

//     add_geojson(geojson) {
//         // if (this.state.layer) {
//         //     Map.remove_layer(this.state.layer);
//         // }
//         // let value = gio.mean(Map.georaster, geojson);
//         // let draw_mode = 'none';
//         // let layer = Map.create_geojson_layer(geojson);
//         // Map.add_layer(layer);
//         // this.setState({ value, draw_mode, layer });
//     }

//     render() {