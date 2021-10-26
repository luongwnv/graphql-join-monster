const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} = require('graphql');
const { GraphQLDateTime } = require('graphql-iso-date');
const { connectionDefinitions, globalIdField } = require('graphql-relay');

const { nodeInterface } = require('./Node');

const Author = new GraphQLObjectType({
    name: 'Author',
    sqlTable: 'authors',
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

const { connectionType: AuthorConnection } = connectionDefinitions({
    nodeType: Author,
    connectionFields: {
        total: { type: GraphQLInt },
    },
});

module.exports = { Author, AuthorConnection };