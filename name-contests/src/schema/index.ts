import { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { MeType } from './types/me';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',

  fields: {
    me: {
      type: MeType,
      description: 'The current user identified by an api key',
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: () => {
        return { id: 42, email: 'example@example.com' };
      },
    },
  },
});

export const ncSchema = new GraphQLSchema({
  query: RootQueryType,
});
