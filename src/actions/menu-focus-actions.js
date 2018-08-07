import { MENU_FOCUS_ON, MENU_FOCUS_OFF } from 'constants/actions';

export const focusMenu = () => ({
  type: MENU_FOCUS_ON
});

export const unfocusMenu = () => ({
  type: MENU_FOCUS_OFF
});
