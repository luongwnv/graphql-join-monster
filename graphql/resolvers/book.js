const joinMonster = require("join-monster").default;

const { pagination } = require("../../utils/join-monter");
const db = require("../../db/knex");

const resolvers = {
  Query: {
    async books(parent, args, context, resolveInfo) {
      const data = await pagination(args, context, resolveInfo);
      return data;
    },

    async book(parent, args, ctx, resolveInfo) {
      console.log(args);
      return joinMonster(
        resolveInfo,
        ctx,
        async (sql) => {
          return await db.raw(sql);
        },
        { dialect: "pg" }
      );
    },
  },

  Mutation: {
    async insertBook(parent, args, context, info) {
      try {
        const { name, author, auth_id } = args;
        const entity = {
          name,
          author,
          auth_id,
        };
        const data = await db("books").insert(entity).returning("*");
        return {
          error: null,
          result: data,
        };
      } catch (error) {
        return {
          error,
          result: null,
        };
      }
    },

    async updateBook(parent, args, context, info) {
      try {
        const { id, name, author, auth_id } = args;
        const entity = {
          name,
          author,
          auth_id,
        };
        const data = await db("books").where({ id }).update(entity).returning("*");
        return {
          error: null,
          result: data,
        };
      } catch (error) {
        return {
          error,
          result: null,
        };
      }
    },
    async deleteBook(parent, args, context, info) {
      try {
        const { id } = args;
        const data = await db("books").del().where({ id }).returning("*");
        return {
          error: null,
          result: data,
        };
      } catch (error) {
        return {
          error,
          result: null,
        };
      }
    },
  },
};

module.exports = { resolvers };
