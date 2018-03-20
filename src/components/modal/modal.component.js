import React from 'react';
import Modal from 'react-modal';

const ModalComponent = ({
  is_open, url_input, file_input, close, update_url_input,
  update_file_input, load_raster_and_close_modal
}) => (
  <Modal
    isOpen={is_open}
    shouldCloseOnOverlayClick={true}
    onRequestClose={close}
    closeTimeoutMS={200}
  >
    <header>
      <span className='geotiff-logo'></span>
      <h3>GeoTIFF</h3>
      <i
        className='material-icons'
        onClick={close}
      >
        clear
      </i>
    </header>
    <section className='content'>
      <p>You have two ways to link to your GeoTIFF. Add a url or upload a file.</p>
      <br />
      <label htmlFor="basic-url">
        URL to Your GeoTIFF
      </label>
      <div className="input-group">
        <input
          type="text"
          className="gt-input"
          onChange={update_url_input}
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
          onChange={update_file_input}
        />
      </div>
      <br />
      <button
        className='gt-button-accent full'
        onClick={load_raster_and_close_modal}
      >
        GO
      </button>
      <p>Log feature requests and issues <a href="https://github.com/danieljdufour/geotiff.io/issues">here</a>.</p>
    </section>
  </Modal>
);

export default ModalComponent;
