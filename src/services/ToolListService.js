const _ = require('underscore');
const Fuse = require('fuse.js');

const ToolListService = {

  toolList: null,

  getToolList() {
    return new Promise((resolve, reject) => {
      if (this.toolList) {
        resolve(this.toolList);
      } else {
        fetch('data/tools.txt').then(response => {
          response.text().then(str => {
            const tools = str.split('\n')
              .filter(Boolean) // filter out blank lines
              .map(tool => tool.split('|'));

            this.toolList = tools.filter(tool => tool[0][0] !== '#'); // this is temporary
            resolve(tools);
          });
        });
      }
    });
  },

  searchToolList(value) {
    return new Promise((resolve, reject) => {
      this.getToolList().then(toolList => {
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
          this.fuse = new Fuse(toolList, options);
        }
        if (value === "") {
          resolve(this.toolList);
        } else {
          resolve(_.pluck(this.fuse.search(value), 'item'));
        }
      });
    });
  }
}

export default ToolListService;
