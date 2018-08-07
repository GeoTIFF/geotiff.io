import { LOADING_START, LOADING_STOP } from 'constants/actions';

export const startLoading = message => ({
  message,
  type: LOADING_START
});

export const stopLoading = () => ({
  type: LOADING_STOP
});
