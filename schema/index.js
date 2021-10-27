const { GraphQLSchema } = require("graphql");

const QueryRoot = require("./QueryRoot");
module.exports = new GraphQLSchema({
  query: QueryRoot,
});
