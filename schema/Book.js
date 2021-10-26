const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
const {
    connectionDefinitions,
    globalIdField,
    forwardConnectionArgs,
} = require('graphql-relay');

const { nodeInterface } = require('./Node');
const { AuthorConnection } = require('./Author');

const Book = new GraphQLObjectType({
    name: 'Book',
    sqlTable: 'books',
    uniqueKey: 'id',
    interfaces: [nodeInterface],
    fields: {
        id: {
            ...globalIdField(),
            sqlDeps: ['id'],
        },

        name: {
            type: GraphQLString,
            sqlColumn: 'name',
        },

        author: {
            type: GraphQLString,
            sqlColumn: 'author',
        },

        authId: {
            type: GraphQLInt,
            sqlColumn: 'auth_id',
        },

        createdAt: {
            type: GraphQLDateTime,
            sqlColumn: 'created_at',
        },

        updateAt: {
            type: GraphQLDateTime,
            sqlColumn: 'update_at',
        },

        authors: {
            type: AuthorConnection,
            sqlPaginate: true,
            args: forwardConnectionArgs,
            orderBy: {
                id: 'desc',
            },
            sqlJoin: (bookTable, authorTable) =>
                `${bookTable}.auth_id = ${authorTable}.id`,
        },
    },
});

const { connectionType: BookConnection } = connectionDefinitions({
    nodeType: Book,
    connectionFields: {
        total: { type: GraphQLInt },
    },
});

module.exports = { Book, BookConnection };