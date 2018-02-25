import React from 'react';
import SweetAlert from 'sweetalert-react';

const AlertComponent = ({ alert, hide_alert }) => (
  <SweetAlert
    show={!!alert}
    title="Woops, there was a problem"
    text={alert}
    onConfirm={hide_alert}
  />
);

export default AlertComponent;
