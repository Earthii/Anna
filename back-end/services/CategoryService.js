var pluralize = require("pluralize");
const validResult = ["garbage", "compost", "recycling"];

class CategoryService {
  static loadData() {
    var fs = require("fs");
    var contents = fs.readFileSync("./data/data.json");
    var data = JSON.parse(contents);
    return data;
  }

  static getCategory(input) {
    var input = input.toLowerCase();
    var singularResult = global.garbageData[pluralize.singular(input)];
    var pluralResult = global.garbageData[pluralize.plural(input)];

    if (validResult.includes(singularResult)) {
      return singularResult;
    } else if (validResult.includes(pluralResult)) {
      return pluralResult;
    } else {
      return false;
    }
  }
}

module.exports = CategoryService;
