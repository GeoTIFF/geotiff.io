export const startLoading = message => (
  { type: 'LOADING_START', message }
);

export const stopLoading = () => (
  { type: 'LOADING_STOP' }
);
