export const addGeometry = (geometry, format) => (
  { type: 'MAP_GEOMETRY_ADD', geometry, format }
);

export const removeGeometry = (geometry, format) => (
  { type: 'MAP_GEOMETRY_REMOVE' }
);
