const Base64 = require("js-base64");

const db = require("../db/knex");

const pagination = async (tableName, first, after, before) => {
  const [res] = await db(tableName).count("*");
  const total = res.count;
  const id = Base64.decode(after);
  const idBefore = Base64.decode(before);
  let query = db(tableName).where(db.raw(`id > ?`, id));
  if (first) {
    query = query.limit(first);
  }
  let items = await query;
  let start = 0;
  if (after) {
    const index = items.findIndex((item) => {
      item.id === id;
    });
    start = index + 1;
  }
  let endCursor = null;
  let startCursor = Base64.encode(items[0].id.toString());
  const edges = items.map((item, index) => {
    const cursor = Base64.encode(item.id.toString());
    endCursor = cursor;
    return {
      cursor,
      node: item,
    };
  });
  const hasNextPage = start + first + Number(id) < total;
  const previous = await db(tableName).where(db.raw(`id < ?`, id)).first();
  const hasPreviousPage = previous ? true : false;
  const pageInfo = {
    startCursor,
    endCursor,
    hasNextPage,
    hasPreviousPage,
  };
  return {
    total,
    edges,
    pageInfo,
  };
};

module.exports = { pagination };
