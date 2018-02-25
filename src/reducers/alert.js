const alert = (state = null, action) => {
  switch(action.type) {
    case 'ALERT_HIDE':
      return null;
    case 'ALERT_SHOW':
      return action.message;
    default:
      return state;
  }
}

export default alert;
