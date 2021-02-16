const { loadSchemaSync } = require('@graphql-tools/load')
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader')
const converter = require('graphql-2-json-schema');
const { getIntrospectionQuery, graphql } = require('graphql')

module.exports = async function (schemaPath) {
  const graphQLSchema = loadSchemaSync(schemaPath, { loaders: [new GraphQLFileLoader()] })
  const { data } = await graphql(graphQLSchema, getIntrospectionQuery())
  const jsonSchema = converter.fromIntrospectionQuery(data);

  return {
    jsonSchema,
    graphQLSchema
  }
}
