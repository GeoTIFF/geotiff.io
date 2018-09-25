import React from 'react';
import HistogramComponent from './histogram.component';
import geoblaze from 'geoblaze';
import _ from 'underscore';
import { setResults } from '../../../actions/results-actions';
import { showAlert } from '../../../actions/alert-actions';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';

const getHistogram = (raster, geometry, options) => {
  const { scaleType, numClasses } = options;

  // make sure parameters are valid
  if (numClasses % 1 !== 0) {
    throw new Error('Please make sure the number of classes is an integer.');
  }
  if (!geometry) {
    throw new Error('Please make sure to select a geography to run the tool on.');
  }

  // convert to list because react doesn't like storing objects in state
  const geojson = geometry.toGeoJSON();
  const results = geoblaze.histogram(raster, geojson, options);
  return setResults(results);
}

const mapStateToProps = state => {
  return {
    results: state.results,
    drawing: state.drawing,
    geometry: state.geometry,
    raster: state.raster
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getHistogram: (raster, geometry, options) => {
      try {
        dispatch(getHistogram(raster, geometry, options));
      } catch (error) {
        dispatch(showAlert(error.message));
      }
    }
  }
}

const HistogramContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withState('scaleType', 'setScaleType', 'ratio'),
  withState('numClasses', 'setNumClasses', 3),
  withState('classType', 'setClassType', 'equal-interval'),
  withHandlers({
    updateScaleType: ({ setScaleType }) => event => {
      return setScaleType(event.target.value);
    },
    updateNumClasses: ({ setNumClasses }) => event => {
      return setNumClasses(event.target.value);
    },
    updateClassType: ({ setClassType }) => event => {
      return setClassType(event.target.value);
    },
    execute: ({
      raster, geometry, scaleType, numClasses, classType, getHistogram
    }) => () => {
      return getHistogram(raster, geometry, { scaleType, numClasses, classType });
    }
  })
)(HistogramComponent);

export default HistogramContainer;
