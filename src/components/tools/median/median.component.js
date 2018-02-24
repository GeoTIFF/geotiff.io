import React from 'react';
import DrawGeometry from '../../shared/draw-geometry';
import ImportGeometry from '../../shared/import-geometry';

const MedianComponent = ({
  results, raster, geometry, execute, close, func
}) => (
  <div id='median-tool' className='tool'>
    <section className='controls'>
      <header>
        <i
          className='material-icons gt-remove'
          onClick={close}
        >
          clear
        </i>
        <h3 className='tool-title'>
          Get the Median Pixel Value of an Area
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
            className='gt-button'
            onClick={() => execute(raster, geometry, func)}
          >
            Calculate Median
          </button>
        </div>
      </div>

    </section>
    {
      results
      ?
        <section className='results'>
          <h3>Median: {results}</h3>
        </section>
      : ''
    }
  </div>
);

export default MedianComponent;
