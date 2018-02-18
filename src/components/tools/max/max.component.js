import React from 'react';
import DrawGeometry from '../../shared/draw-geometry';
import ImportGeometry from '../../shared/import-geometry';

const MaxComponent = ({
  results, raster, geometry, execute, close, func
}) => (
  <div id='max-tool' className='tool'>
    <section className='controls'>
      <header>
        <i
          className='material-icons gt-remove'
          onClick={close}
        >
          clear
        </i>
        <h3 className='tool-title'>
          Get the Maximum Pixel Value of an Area
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
            Calculate Maximum
          </button>
        </div>
      </div>
    </section>
    {
      results
      ?
        <section className='results'>
          <h3>Maximum: {results}</h3>
        </section>
      : ''
    }
  </div>
);

export default MaxComponent;
