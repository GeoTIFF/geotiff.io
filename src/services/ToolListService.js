import _ from 'underscore';
import Fuse from 'fuse.js';
import toolList from '../constants/tools.json';

const ToolListService = {

  getToolList() {
    return toolList.tools;
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
          { name: "0", weight: 0.5 },
          { name: "2", weight: 0.2 }
        ]
      };
      this.fuse = new Fuse(toolList.tools, options);
    }

    if (value === "") {
      return toolList.tools;
    } else {
      return _.pluck(this.fuse.search(value), 'item');
    }
  }
}

export default ToolListService;
