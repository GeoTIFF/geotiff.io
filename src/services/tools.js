import _ from 'underscore';
import Fuse from 'fuse.js';
import toolList from 'constants/tools.json';

export const { tools } = toolList;

export const getTool = toolName => {
  return tools.find(tool => tool.param === toolName);
}

let fuse;
const fuseOptions = {
  includeScore: true,
  shouldSort: true,
  tokenize: true,
  threshold: 0.0001,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    { name: "name", weight: 0.5 },
    { name: "iconUrl", weight: 0.2 },
    { name: "path", weight: 0.2 }
  ]
};

export const getTools = value => {
  if (value === '') return tools;
  if (!fuse) fuse = new Fuse(tools, fuseOptions);
  return _.pluck(fuse.search(value), 'item');
}
