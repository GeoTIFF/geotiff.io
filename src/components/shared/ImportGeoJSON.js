import React, { Component } from 'react';
import gio from '@geotiff/gio';

class ImportGeoJSON extends Component {

    constructor(props) {
        super(props);
        this.state = {
            geojson: ''
        }
        this.onChange = this.onChange.bind(this);
        this.import = this.import.bind(this);
        this.run = this.run.bind(this);
    }

    onChange(event) {
        let geojson = event.target.value;
        this.setState({ geojson });
    }

    is_json_str(str) {
        try {
            JSON.parse(str);
        } catch(e) {
            return false;
        }
        return true;
    }

    import(event) {
        let file = event.target.files[0];
        let file_reader = new FileReader();
        file_reader.onload = (evt) => {
            try {
                let geojson = evt.target.result;
                if (this.is_json_str(geojson)) {
                    this.setState({ geojson });
                } else {
                    throw 'File could not be uploaded. Please make sure to upload a valid JSON file';
                }
            } catch(e) {
                alert(e);
            }
        }
        file_reader.readAsText(file);
    }

    run() {
        try {
            let geojson = JSON.parse(this.state.geojson)
            this.props.add_geojson(geojson);
        } catch(e) {
            alert('JSON is invalid. Please make sure to use valid JSON.');
        }
    }

    render() {
        return (
            <div className='import-geojson'>
                <textarea 
                    className='gt-textarea'
                    rows='7'
                    onChange={this.onChange}
                    value={this.state.geojson}
                ></textarea>
                <div className='content-row'>
                    <label 
                        className='gt-button'
                        htmlFor="import-geojson-input"
                    >
                        Import GeoJSON
                    </label>
                    <input 
                        id='import-geojson-input'
                        type='file'
                        className='gt-input'
                        onChange={this.import}
                    />
                    <button className='gt-button' onClick={this.run}>Add to Map</button>
                </div>
            </div>
        );
    }
}

export default ImportGeoJSON;
