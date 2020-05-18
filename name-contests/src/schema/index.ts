import { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { UserType } from './types/user';
import pgdb from '../database/pgdb';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',

  fields: {
    me: {
      type: UserType,
      description: 'The current user identified by an api key',
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (obj, args, { pgPool }) => {
        return pgdb(pgPool).getUserByApiKey(args.key);
      },
    },
  },
});

export const ncSchema = new GraphQLSchema({
  query: RootQueryType,
});
