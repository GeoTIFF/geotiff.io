import _ from 'underscore';
import Fuse from 'fuse.js';
import toolList from '../constants/tools.json';

const ToolListService = {

  getToolList() {
    return toolList.tools;
  },

  searchToolList(value) {
    return new Promise((resolve, reject) => {
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
        this.fuse = new Fuse(toolList.tools, options);
      }

      if (value === "") {
        resolve(toolList.tools);
      } else {
        resolve(_.pluck(this.fuse.search(value), 'item'));
      }
    });
  }
}

export default ToolListService;
