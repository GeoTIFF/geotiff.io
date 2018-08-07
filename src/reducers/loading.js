import { LOADING_START, LOADING_STOP } from 'constants/actions';

const loading = (state = null, action) => {
  switch (action.type) {
    case LOADING_START:
      return action.message;
    case LOADING_STOP:
      return null;
    default:
      return state;
  }
}

export default loading;
