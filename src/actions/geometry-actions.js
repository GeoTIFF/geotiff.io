export const add_geometry = (geometry, format) => (
  { type: 'MAP_GEOMETRY_ADD', geometry, format }
);

export const remove_geometry = (geometry, format) => (
  { type: 'MAP_GEOMETRY_REMOVE' }
);
