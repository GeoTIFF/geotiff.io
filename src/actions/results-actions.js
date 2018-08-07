import { RESULTS_SET, RESULTS_CLEAR } from 'constants/actions';

export const setResults = results => ({
  results,
  type: RESULTS_SET
});

export const clearResults = results => ({
  type: RESULTS_CLEAR
});
