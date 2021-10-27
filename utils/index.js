const _ = require("lodash");

const mapIds = (ids, results) => {
  const m = _.keyBy(results, "id");
  return ids.map((id) => m[id] || null);
};

module.exports = { mapIds };
