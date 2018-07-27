import React from 'react';
import SweetAlert from 'sweetalert-react';

const AlertComponent = ({ alert, hideAlert }) => (
  <SweetAlert
    show={!!alert}
    title="Woops, there was a problem"
    text={alert}
    onConfirm={hideAlert}
  />
);

export default AlertComponent;
