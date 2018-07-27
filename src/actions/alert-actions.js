export const hideAlert = () => (
  { type: 'ALERT_HIDE' }
);

export const showAlert = message => (
  { type: 'ALERT_SHOW', message }
);
