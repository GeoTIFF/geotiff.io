let React = require('react');
let MapContainer = require('./MapContainer');
let Menu = require('./Menu');

class App extends React.Component {
    render() {
        return (
            <div className="App">
            	<Menu />
                <MapContainer />
            </div>
        );
    }
}

module.exports = App;
