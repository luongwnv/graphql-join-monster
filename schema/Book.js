const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLNonNull,
} = require('graphql');

const {
    GraphQLDate,
    GraphQLTime,
    GraphQLDateTime,
} = require('graphql-iso-date');

const {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    forwardConnectionArgs,
} = require('graphql-relay');

const Author = require('./Author');
const { nodeInterface } = require('./Node');

const Book = new GraphQLObjectType({
    name: 'Book',
    sqlTable: 'books',
    uniqueKey: 'id',
    fields: {
        id: {
            type: GraphQLInt,
            sqlColumn: 'id',
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
            type: new GraphQLNonNull(Author),
            sqlJoin(bookTable, authorTable) {
                return `${bookTable}.auth_id = ${authorTable}.id`;
            },
        },
    },
});

module.exports = Book;