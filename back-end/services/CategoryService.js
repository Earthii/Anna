var pluralize = require("pluralize");

class CategoryService {
  static loadData() {
    var fs = require("fs");
    var contents = fs.readFileSync("./data/data.json");
    var data = JSON.parse(contents);
    return data;
  }

  static getCategory(input) {
    var validResult = ["garbage", "compost", "recycling"];
    var input = input.toLowerCase();
    var singular = pluralize.singular(input);
    var plural = pluralize.plural(input);

    var singularResult = global.garbageData[singular];
    var pluralResult = global.garbageData[plural];

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
