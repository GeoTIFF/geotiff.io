import { MAP_DRAW_START, MAP_DRAW_STOP } from 'constants/actions';

export const startDrawing = format => ({
  type: MAP_DRAW_START, format
});

export const stopDrawing = () => ({
  type: MAP_DRAW_STOP
});
