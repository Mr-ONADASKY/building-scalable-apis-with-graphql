import { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { UserType } from './types/user';
import AddContestMutation from './mutations/add-contest';

export const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',

  fields: {
    me: {
      type: UserType,
      description: 'The current user identified by an api key',
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (obj, args, { loaders }) => loaders.usersByApiKeys.load(args.key),
    },
  },
});

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: () => ({
    AddContest: AddContestMutation,
    // AddName: AddNameMutation,
  }),
});

export const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
