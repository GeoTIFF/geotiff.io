import { MAP_GEOMETRY_ADD, MAP_GEOMETRY_REMOVE } from 'constants/actions';

export const addGeometry = (geometry, format) => ({
  format,
  geometry,
  type: MAP_GEOMETRY_ADD
});

export const removeGeometry = (geometry, format) => ({
  type: MAP_GEOMETRY_REMOVE
});
