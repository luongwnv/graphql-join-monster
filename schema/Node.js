const { nodeDefinitions, fromGlobalId } = require("graphql-relay");

const joinMonster = require("join-monster").default;

const db = require("../db/knex");

const { nodeInterface, nodeField } = nodeDefinitions(
  async (globalId, context, resolveInfo) => {
    const { type, id } = fromGlobalId(globalId);
    return await joinMonster.getNode(
      type,
      resolveInfo,
      context,
      parseInt(id),
      (sql) => {
        return db.raw(sql);
      },
      { dialect: "pg" }
    );
  },
  (obj) => obj.__type__
);

module.exports = { nodeInterface, nodeField };
