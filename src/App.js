let React = require('react');
let ReactDOM = require('react-dom');
let MapContainer = require('./MapContainer');
let Menu = require('./Menu');
let WelcomePopup = require("./WelcomePopup");

class App extends React.Component {

    constructor(props) {
        super(props);
        var url_params = new URLSearchParams(window.location.search);
        var hide_menu = ["", "true", "True", "y", "Y", "yes", "Yes"].indexOf(url_params.get("hide_menu")) > -1 || false;
        this.state = {
            hide_menu: hide_menu,
            params: url_params
        };
    } 

    componentDidMount() {
        var element = ReactDOM.findDOMNode(this.refs.main_app);
        element.setAttribute("hide_menu", this.state.hide_menu);
    }

    render() {
        return (
            <div className="App" ref="main_app">
                <WelcomePopup />
                <Menu params={this.state.params}/>;
                <MapContainer params={this.state.params}/>
            </div>
        );
    }
}

module.exports = App;
