import { ALERT_HIDE, ALERT_SHOW } from 'constants/actions';

export const hideAlert = () => ({
  type: ALERT_HIDE
});

export const showAlert = message => ({
  type: ALERT_SHOW, message
});
