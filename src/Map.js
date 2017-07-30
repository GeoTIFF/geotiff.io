import React, { Component } from 'react';

import L from 'leaflet';

import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';

class Map extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        // add map
        let map = L.map('map').setView([0, 0], 2);
        map.options.minZoom = 2;

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
    }

    render() {
        return (
            <div id='map'></div>
        )
    }
}

export default Map;