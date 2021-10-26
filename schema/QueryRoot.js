const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
} = require('graphql');

const joinMonster = require('join-monster').default;
const Book = require('./Book');
const Author = require('./Author');
const { nodeField } = require('./Node');

const db = require('../db/knex');

module.exports = new GraphQLObjectType({
    description: 'global query object',
    name: 'Query',
    fields: {
        version: {
            type: GraphQLString,
            resolve: () => joinMonster.version,
        },

        node: nodeField,

        books: {
            type: new GraphQLList(Book),
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster(resolveInfo, context, (sql) => {
                    return db.raw(sql);
                });
            },
        },
        book: {
            type: new GraphQLList(Book),
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLInt),
                },
            },
            where: (bookTable, args, context) => {
                return `${bookTable}.id = ${args.id}`;
            },
            resolve: (parent, args, context, resolveInfo) => {
                return joinMonster(resolveInfo, context, (sql) => db.raw(sql));
            },
        },
    },
});