let React = require('react');

let Map = require('./Map');

class MapContainer extends React.Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    	Map.initialize();
    }

    render() {
        return (
            <div id='map'></div>
        )
    }
}

module.exports = MapContainer;