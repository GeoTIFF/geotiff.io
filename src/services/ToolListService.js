/* global SITE_CONFIG */
import _ from 'underscore';
import Fuse from 'fuse.js';
import toolList from '../constants/tools.json';

const ToolListService = {

  getToolList() {
    if (SITE_CONFIG.tools) {
      const includeTheseTools = SITE_CONFIG.tools.map(tool => tool.toLowerCase().trim());
      return toolList.tools.filter(tool => includeTheseTools.includes(tool.param));
    } else {
      return toolList.tools;
    }
  },

  searchToolList(value) {
    if (!this.fuse) {
      const options = {
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
      this.fuse = new Fuse(this.getToolList(), options);
    }

    if (value === '') return this.getToolList();
    return _.pluck(this.fuse.search(value), 'item');
  }
}

export default ToolListService;
