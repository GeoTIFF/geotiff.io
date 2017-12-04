export const start_drawing = format => (
    { type: 'MAP_DRAW_START', format }
);

export const stop_drawing = () => (
    { type: 'MAP_DRAW_STOP' }
);