import React, { Component } from 'react';
import Map from './Map';

class MapContainer extends React.Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    	Map.initialize(this.props.params);
    }

    render() {
        return (
            <div id='map'></div>
        )
    }
}

export default MapContainer;
