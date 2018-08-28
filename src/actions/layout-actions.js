import { LAYOUT_DEFAULT, LAYOUT_HIDE_MENU } from 'constants/actions';

export const setDefaultLayout = layout => ({
  type: LAYOUT_DEFAULT
});

export const setHideMenuLayout = layout => ({
  type: LAYOUT_HIDE_MENU
});
