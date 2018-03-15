import React from 'react';
import { Link } from 'react-router-dom';
import DrawGeometry from '../../shared/draw-geometry';
import ImportGeometry from '../../shared/import-geometry';

const ModeComponent = ({
  results, raster, geometry, execute, close, func
}) => (
  <div id='mode-tool' className='tool'>
    <section className='controls'>
      <header>
        <Link to="/">
          <i className='gt-remove'></i>
          <span>Back</span>
        </Link>
        <h3 className='tool-title'>
          Get the Mode (Most Common) Pixel Value of an Area
        </h3>
      </header>
      <div className='content'>
        <DrawGeometry />
        <p className="or">
          <b>OR</b>
        </p>
        <ImportGeometry />
        <div className='content-row'>
          <button
            className='gt-button-accent full'
            onClick={() => execute(raster, geometry, func)}
          >
            Calculate Mode
          </button>
        </div>
      </div>

    </section>
    {
      results
      ?
        <section className='results'>
          <h3>Mode: {results}</h3>
        </section>
      : ''
    }
  </div>
);

export default ModeComponent;
