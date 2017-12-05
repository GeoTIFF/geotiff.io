import _ from 'underscore';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import geoblaze from 'geoblaze';
import { add_geometry, remove_geometry } from './actions/geometry-actions';
import { stop_drawing } from './actions/drawing-actions';
import { set_results } from './actions/results-actions';
import { unfocus_menu } from './actions/menu-focus-actions';

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
            store.dispatch(unfocus_menu());
            if (self.drawing_points) {
                store.dispatch(remove_geometry());
                store.dispatch(add_geometry(e.latlng, 'point'));

                // temporary - setting results for identify here since
                // i can't find a good way of getting it in to the identify
                // tool while using leaflet for mapping
                let latlng = [e.latlng.lng, e.latlng.lat];
                let results = geoblaze.identify(self.raster.georaster, latlng);
                store.dispatch(set_results(results));
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
        return L.marker(latlng).addTo(map);
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
