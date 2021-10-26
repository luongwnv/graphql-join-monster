const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
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

const Book = require('./Book');

const Author = new GraphQLObjectType({
    name: 'Author',
    sqlTable: 'authors',
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

        createdAt: {
            type: GraphQLDateTime,
            sqlColumn: 'created_at',
        },

        updateAt: {
            type: GraphQLDateTime,
            sqlColumn: 'update_at',
        },
    },
});

module.exports = Author;