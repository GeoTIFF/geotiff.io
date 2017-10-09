let _ = require('underscore');

let L = window.L;

import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';

let map, draw_control;
let instance = null;

let Map = {

    tiff: null,
    image: null,
    raster: null,

    subscribers: [],

    initialize(params) {

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

        map.on('click', e => this.notify('map-click', e.latlng));
        map.on('draw:created', e => this.notify(e.layerType, e));
    },

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    },

    unsubscribe(traitor) {
        let index = _.indexOf(this.subscribers, subscriber => subscriber == traitor);
        if (index) this.subscribers.splice(index, 1);
    },

    notify(event_type, message) {
        this.subscribers.forEach(subscriber => subscriber.listen(event_type, message));
    },

    add_raster_layer(layer) {

        // remove existing raster
        if (this.raster) map.removeLayer(this.raster);

        // add new raster
        layer.addTo(map);

        // create bounding box to highlight raster
        let layer_bounds = layer.getBounds();
        map.flyToBounds(layer_bounds);
        L.rectangle(layer_bounds, {
            color: "#ff0000",
            fillOpacity: 0,
            weight: 1
        }).addTo(map);

        this.raster = layer;
    },

    add_layer(layer) {
        layer.addTo(map);
    },

    add_marker(latlng) {
        return L.marker(latlng).addTo(map);
    },

    remove_layer(layer) {
        map.removeLayer(layer);
    },

    create_geojson_layer(geojson) {
        return L.geoJSON(geojson);
    },

    start_draw_rectangle() {
        this.rectangle = new L.Draw.Rectangle(map, draw_control.options.rectangle);
        this.rectangle.enable();
    },

    stop_draw_rectangle() {
        this.rectangle.disable();
    },

    start_draw_polygon() {
        this.polygon = new L.Draw.Polygon(map, draw_control.options.polygon);
        this.polygon.enable();
    },

    stop_draw_polygon() {
        this.polygon.disable();
    }
}

module.exports = Map;
