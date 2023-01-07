import _ from 'underscore';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import geoblaze from 'geoblaze';
import { addGeometry, removeGeometry } from './actions/geometry-actions';
import { stopDrawing } from './actions/drawing-actions';
import { setResults } from './actions/results-actions';
import { focusMenu, unfocusMenu } from './actions/menu-focus-actions';
import 'leaflet-draw';

let store;
const L = window.L;
let map, drawControl;

const Map = {

  tiff: null,
  image: null,
  raster: null,
  drawingPoints: null,

  subscribers: [],

  initialize(params) {
    let self = this;
    store = window.store;

    // add map
    map = L.map('map').setView([0, 0], 2);
    map.options.minZoom = 2;

    // add draw controls
    const drawOptions = {
      /*draw: {
        rectangle: {
          shapeOptions: {
            clickable: false
          }
        }
      }*/
    };
    drawControl = new L.Control.Draw(drawOptions);
    map.addControl(drawControl);

    // add osm basemap
    let openStreetMapMapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    openStreetMapMapnik.addTo(map);

    // add search
    let provider = new OpenStreetMapProvider();

    let searchControl = new GeoSearchControl({
      provider: provider,
    });
    map.addControl(searchControl);

    map.on('click', e => {
      store.dispatch(unfocusMenu());
      if (self.drawingPoints) {
        store.dispatch(removeGeometry());
        store.dispatch(addGeometry(e.latlng, 'point'));

        // temporary - setting results for identify here since
        // i can't find a good way of getting it in to the identify
        // tool while using leaflet for mapping
        const latlng = [e.latlng.lng, e.latlng.lat];
        const results = geoblaze.identify(self.raster.georasters[0], latlng);
        results.then(
          (data) => {
            store.dispatch(setResults(data));
          },
          (err) => {
            console.log("error", err);
          }
        );
        
      }
    });

    map.on('draw:created', e => {
      store.dispatch(stopDrawing());
      store.dispatch(addGeometry(e.layer, 'polygon'));
      setTimeout(() => store.dispatch(focusMenu()), 100);
    });
  },

  addRaster(layer) {
    console.log(layer);
    if (this.raster) map.removeLayer(this.raster);
    layer.addTo(map);

    const layerBounds = layer.getBounds();
    map.fitBounds(layerBounds);

    L.rectangle(layerBounds, {
      color: "#ff0000",
      fillOpacity: 0,
      weight: 1
    }).addTo(map);

    this.raster = layer;
  },

  removeRaster() {
    map.removeLayer(this.raster);
    this.raster = null;
  },

  addPolygon(layer) {
    layer.addTo(map);
  },

  addPoint(latlng) {
    return L.marker(latlng).addTo(map);
  },

  removeLayer(layer) {
    map.removeLayer(layer);
  },

  createGeojsonLayer(geojson) {
    return L.geoJSON(geojson);
  },

  startDrawRectangle() {
    this.rectangleDrawer = new L.Draw.Rectangle(map, drawControl.options.rectangle);
    this.rectangleDrawer.enable();
  },

  stopDrawRectangle() {
    if (this.rectangleDrawer) {
      this.rectangleDrawer.disable();
    }
  },

  startDrawPolygon() {
    this.polygonDrawer = new L.Draw.Polygon(map, drawControl.options.polygon);
    this.polygonDrawer.enable();
  },

  stopDrawPolygon() {
    if (this.polygonDrawer) {
      this.polygonDrawer.disable();
    }
  },

  startDrawPoint() {
    this.drawingPoints = true;
  },

  stopDrawPoint() {
    this.drawingPoints = false;
  }
}

export default Map;
