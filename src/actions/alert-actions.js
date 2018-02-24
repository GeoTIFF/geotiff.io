export const hide_alert = () => (
  { type: 'ALERT_HIDE' }
);

export const show_alert = message => (
  { type: 'ALERT_SHOW', message }
);
