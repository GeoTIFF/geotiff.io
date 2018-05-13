let _ = require('underscore');
let Fuse = require('fuse.js');

let ToolListService = {

  tool_list: null,

  get_tool_list() {
    return new Promise((resolve, reject) => {
      if (this.tool_list) {
        resolve(this.tool_list);
      } else {
        fetch('data/tools.txt').then(response => {
          response.text().then(str => {
            let tools = str.split('\n')
              .filter(Boolean) // filter out blank lines
              .map(tool => tool.split('|'));

            this.tool_list = tools.filter(tool => tool[0][0] !== '#'); // this is temporary
            resolve(tools);
          });
        });
      }
    });
  },

  search_tool_list(value) {
    return new Promise((resolve, reject) => {
      this.get_tool_list().then(tool_list => {
        console.log("tool_list:", tool_list);
        if (!this.fuse) {
          let options = {
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
          this.fuse = new Fuse(tool_list, options);
        }
        if (value === "") {
          resolve(this.tool_list);
        } else {
          resolve(_.pluck(this.fuse.search(value), 'item'));
        }
      });
    });
  }
}

export default ToolListService;
