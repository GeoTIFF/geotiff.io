let React = require('react');

let Loader = require("./shared/Loader");
console.log("Loader:", Loader);

let load_raster = require("./shared/load_raster");
console.log("load_raster:", load_raster);

class WelcomePopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            input: '',
            loading: false
        };
        this.change_input_from_url = this.change_input_from_url.bind(this);
        this.change_input_from_file = this.change_input_from_file.bind(this);
        this.load_raster = this.load_raster.bind(this);
    }
   
    componentDidMount() {
        // could probably have a global promise to load jQuery
        // too doubley make sure
        window.$(".modal").modal();
    }

    change_input_from_url(event) {
        let input = event.target.value;
        this.setState({ input });
    }

    change_input_from_file(event) {
        let input = event.target.files[0];
        this.setState({ input });
    }

    load_raster() {
        window.$(".modal").modal('hide');
        console.error("setting state loading to true");
        this.setState({ loading: true });
        console.log("set state loading to true");
        let input = this.state.input;
        load_raster(input).then(() => {
            console.error("this.state after loading was:", this.state);
            this.setState({ loading: false });
        });
    }

    render() {
      return (
       <div>
        <Loader loading={this.state.loading}/>
        <div className="modal fade show">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Welcome to GeoTIFF.io</h5>
                        <button type="button" data-dismiss="modal" aria-label="Close">
                            <i className='material-icons gt-remove'>clear</i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Welcome to GeoTIFF.io, a simple website for viewing GeoTIFF files in your browser.</p>
                        <br></br>
                        <p>You have two ways to link to your GeoTIFF. Add a url or upload a file.</p>
                        <label htmlFor="basic-url">URL to Your GeoTIFF</label>
                        <div>
                            <input type="text" className="gt-input" id="url-to-raster" onChange={this.change_input_from_url}></input>
                        </div>
                        <br></br>
                        <p className="or"><b>OR</b></p>
                        <label htmlFor="basic-url">Load File</label>
                        <div className="gt-input">
                            <input type="file" className="form-control" id="file" onChange={this.change_input_from_file}></input>
                        </div>
                        <br></br>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="gt-button" id="go" onClick={this.load_raster}>GO</button>
                    </div>
                    <div className="modal-footer">
                        <p>Log feature requests and issues <a href="https://github.com/danieljdufour/geotiff.io/issues">here</a>.</p>
                    </div>
                </div>
            </div>
         </div>
        </div>
      )
    }
}

module.exports = WelcomePopup;
