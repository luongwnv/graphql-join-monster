const { GraphQLObjectType } = require('graphql');
const { connectionArgs } = require('graphql-relay');

const { nodeField } = require('./Node');
const { pagination } = require('../utils/joinMonter');
const { CategoryConnection } = require('./Category');
const { AuthorConnection } = require('./Author');
const { BookConnection } = require('./Book');

const resolver = new GraphQLObjectType({
    description: 'global query object',
    sqlPaginate: true,
    name: 'Query',
    fields: {
        node: nodeField,

        books: {
            type: BookConnection,
            args: connectionArgs,
            resolve: async(parent, args, context, resolveInfo) => {
                let nameTable = 'books';
                const data = pagination(nameTable, args, context, resolveInfo);
                return data;
            },
        },

        authors: {
            type: AuthorConnection,
            args: connectionArgs,
            resolve: async(parent, args, context, resolveInfo) => {
                let nameTable = 'authors';
                const data = pagination(nameTable, args, context, resolveInfo);
                return data;
            },
        },

        categries: {
            type: CategoryConnection,
            args: connectionArgs,
            resolve: async(parent, args, context, resolveInfo) => {
                let nameTable = 'categories';
                const data = pagination(nameTable, args, context, resolveInfo);
                return data;
            },
        },
    },
});

module.exports = resolver;