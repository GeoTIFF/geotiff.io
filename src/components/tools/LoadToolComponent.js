import React, { Component } from 'react';

class LoadToolComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: ''
        };
        this.change_input_from_url = this.change_input_from_url.bind(this);
        this.change_input_from_file = this.change_input_from_file.bind(this);
    }

    change_input_from_url(event) {
        let input = event.target.value;
        this.setState({ input });
    }

    change_input_from_file(event) {
        let input = event.target.files[0];
        this.setState({ input });
    }

    render() {
        return (
            <div id='load-tool' className='tool'>
                <section className='controls'>
                    <header>
                        <i 
                            className='material-icons gt-remove'
                            onClick={this.props.on_remove}
                        >
                            clear
                        </i>
                        <h3 className='tool-title'>Load a GeoTIFF</h3>
                    </header>
                    <div className='content'>
                        <p className='tool-desc'>
                            You have two ways to add a GeoTIFF to the map. Add a url or upload a file
                        </p>
                        <br />
                        <label htmlFor="basic-url">
                            URL to Your GeoTIFF
                        </label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="gt-input"
                                onChange={this.change_input_from_url}
                            />
                        </div>
                        <br />
                        <p className="or"><b>OR</b></p>
                        <label htmlFor="basic-url">
                            Load File
                        </label>
                        <div className="gt-input">
                            <input 
                                type="file"
                                onChange={this.change_input_from_file}
                            />
                        </div>
                        <br />
                        <button 
                            className='gt-button to-right'
                            onClick={() => this.props.load_raster(this.state.input)}
                        >
                            Load
                        </button>
                    </div>
                </section>
            </div>
        );
    }
}

export default LoadToolComponent;
