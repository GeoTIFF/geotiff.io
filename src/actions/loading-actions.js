export const start_loading = message => (
  { type: 'LOADING_START', message }
);

export const stop_loading = () => (
  { type: 'LOADING_STOP' }
);
