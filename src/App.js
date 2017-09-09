let React = require('react');
let MapContainer = require('./MapContainer');
let Menu = require('./Menu');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            params: new URLSearchParams(window.location.search)
        };
    }

    componentDidMount() {
        console.log("App mounted");
    }

    render() {
        return (
            <div className="App">
            	<Menu params={this.state.params}/>
                <MapContainer params={this.state.params}/>
            </div>
        );
    }
}

module.exports = App;
