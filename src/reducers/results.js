import { RESULTS_SET, RESULTS_CLEAR } from 'constants/actions';

const results = (state = null, action) => {
  switch (action.type) {
    case RESULTS_SET:
      return action.results;
    case RESULTS_CLEAR:
      return null;
    default:
      return state;
  }
}

export default results;
