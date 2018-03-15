import React from 'react';
import { Link } from 'react-router-dom';
import DrawGeometry from '../../shared/draw-geometry';
import ImportGeometry from '../../shared/import-geometry';

const MeanComponent = ({
  results, raster, geometry, execute, close, func
}) => (
  <div id='mean-tool' className='tool'>
    <section className='controls'>
      <header>
        <Link to="/">
          <i className='gt-remove'></i>
          <span>Back</span>
        </Link>
        <h3 className='tool-title'>
          Get the Mean Pixel Value of an Area
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
            Calculate Mean
          </button>
        </div>
      </div>
    </section>
    {
      results
      ?
        <section className='results'>
          <h3>Mean: {results}</h3>
        </section>
      : ''
    }
  </div>
);

export default MeanComponent;
