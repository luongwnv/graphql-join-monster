const { makeExecutableSchema } = require("graphql-tools");
const joinMonsterAdapt = require("join-monster-graphql-tools-adapter");
const { globalIdField } = require("graphql-relay");

const typeDefs = require("./typeDefs");
let resolvers = require("./resolvers");
const scalar = require("../scalar/isoDate");
const { nodeInterface } = require("../utils/node");

resolvers = { ...scalar, ...resolvers };

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

joinMonsterAdapt(schema, {
  Query: {
    fields: {
      books: {
        sqlTable: "books",
        sqlPaginate: true,
        orderBy: {
          id: "desc",
        },
      },

      authors: {
        sqlTable: "authors",
        sqlPaginate: true,
        orderBy: {
          id: "desc",
        },
      },

      categories: {
        sqlTable: "categories",
        sqlPaginate: true,
        orderBy: {
          id: "desc",
        },
      },

      book: {
        where: (table, args) => {
          console.log(args);
          return `${table}.id=${args.id}`;
        },
      },
    },
  },

  Mutation: {
    fields: {},
  },

  Author: {
    description: "Author description",
    name: "Author",
    sqlTable: "authors",
    uniqueKey: "id",
    sqlPaginate: true,
    interfaces: [nodeInterface],
    fields: {
      id: {
        ...globalIdField(),
        sqlDeps: ["id"],
      },
      createdAt: {
        sqlColumn: "created_at",
      },
      updateAt: {
        sqlColumn: "update_at",
      },
    },
  },

  Book: {
    description: "Book description",
    name: "Book",
    sqlTable: "books",
    uniqueKey: "id",
    sqlPaginate: true,
    interfaces: [nodeInterface],
    fields: {
      id: {
        ...globalIdField(),
        sqlDeps: ["id"],
      },
      createdAt: {
        sqlColumn: "created_at",
      },
      updateAt: {
        sqlColumn: "update_at",
      },
      authors: {
        sqlTable: "authors",
        sqlJoin: (bookTable, authorTable) => `${bookTable}.auth_id=${authorTable}.id`,
      },
    },
  },

  Category: {
    description: "Category description",
    name: "Category",
    sqlTable: "categories",
    uniqueKey: "id",
    sqlPaginate: true,
    interfaces: [nodeInterface],
    fields: {
      id: {
        ...globalIdField(),
        sqlDeps: ["id"],
      },
      authors: {
        sqlJoin: (categoryTable, authorTable) => `${categoryTable}.auth_id=${authorTable}.id`,
      },
      books: {
        sqlJoin: (categoryTable, bookTable) => `${categoryTable}.book_id=${bookTable}.id`,
      },
    },
  },
});

module.exports = schema;
