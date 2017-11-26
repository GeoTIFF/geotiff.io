import _ from 'underscore';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import { add_geometry } from './actions/geometry-actions';
import { stop_drawing } from './actions/drawing-actions';

let store;
let L = window.L;
let map, draw_control;

let Map = {

    tiff: null,
    image: null,
    raster: null,
    drawing_points: null,

    subscribers: [],

    initialize(params) {
        let self = this;
        store = window.store;

        // add map
        map = L.map('map').setView([0, 0], 2);
        map.options.minZoom = 2;

        // add draw controls
        let draw_options = {
            /*draw: {
                rectangle: {
                    shapeOptions: {
                        clickable: false
                    }
                }
            }*/
        };
        draw_control = new L.Control.Draw(draw_options);
        map.addControl(draw_control);

        // add osm basemap
        let OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        OpenStreetMap_Mapnik.addTo(map);

        // add search
        let provider = new OpenStreetMapProvider();

        let searchControl = new GeoSearchControl({
            provider: provider,
        });
        map.addControl(searchControl);

        map.on('click', e => {
            if (self.drawing_points) {
                if (self.layer) self.remove_layer(self.layer);
                store.dispatch(add_geometry(e.latlng, 'point'));
            }
        });
        map.on('draw:created', e => {
            store.dispatch(stop_drawing());
            store.dispatch(add_geometry(e.layer, 'polygon'));
        });
    },

    add_raster(layer) {
        if (this.raster) map.removeLayer(this.raster);
        layer.addTo(map);

        let layer_bounds = layer.getBounds();
        map.fitBounds(layer_bounds);

        L.rectangle(layer_bounds, {
            color: "#ff0000",
            fillOpacity: 0,
            weight: 1
        }).addTo(map);

        this.raster = layer;
    },

    remove_raster() {
        map.removeLayer(this.raster);
        this.raster = null;
    },

    add_polygon(layer) {
        layer.addTo(map);
    },

    add_point(latlng) {
        this.layer = L.marker(latlng);
        return this.layer.addTo(map);
    },

    remove_layer(layer) {
        map.removeLayer(layer);
    },

    create_geojson_layer(geojson) {
        return L.geoJSON(geojson);
    },

    start_draw_rectangle() {
        this.rectangle_drawer = new L.Draw.Rectangle(map, draw_control.options.rectangle);
        this.rectangle_drawer.enable();
    },

    stop_draw_rectangle() {
        if (this.rectangle_drawer) {
            this.rectangle_drawer.disable();
        }
    },

    start_draw_polygon() {
        this.polygon_drawer = new L.Draw.Polygon(map, draw_control.options.polygon);
        this.polygon_drawer.enable();
    },

    stop_draw_polygon() {
        if (this.polygon_drawer) {
            this.polygon_drawer.disable();
        }
    },

    start_draw_point() {
        this.drawing_points = true;
    },

    stop_draw_point() {
        this.drawing_points = false;
    }
}

export default Map;
