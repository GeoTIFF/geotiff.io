import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MapContainerComponent from './MapContainerComponent';
import Menu from '../containers/Menu';

class App extends Component {

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
                <Menu />
                <MapContainerComponent />
            </div>
        );
    }
}

export default App;
