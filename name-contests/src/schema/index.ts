import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',

  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'world',
    },
  },
});

export const ncSchema = new GraphQLSchema({
  query: RootQueryType,
});
