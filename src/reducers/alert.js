const alert = (state = null, action) => {
  console.error('look an action: ', action);
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
