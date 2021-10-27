const DataLoader = require("dataloader");

const utils = require("./index");
const db = require("../../db");

const knex = db.knex;

const createDataLoader = (resource) =>
  new DataLoader(async (list) => {
    return await Promise.all(
      list.map(async (ids) => {
        const results = await knex(resource).whereRaw(`id = any(?)`, [ids]);
        return utils.mapIds(ids, results);
      })
    );
  });

module.exports = {
  createDataLoader,
};
