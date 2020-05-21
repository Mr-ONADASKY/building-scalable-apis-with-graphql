import { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { UserType } from './user';
import TotalVotes from './total-votes';

export const NameType = new GraphQLObjectType({
  name: 'Name',
  fields: () => ({
    id: { type: GraphQLID },
    label: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    createdBy: {
      type: new GraphQLNonNull(UserType),
      resolve: (obj, args, { loaders }) => loaders.usersByIds.load(obj.createdBy),
    },
    totalVotes: {
      type: TotalVotes,
      resolve: (obj, args, { loaders }) => loaders.totalVotesByNameIds.load(obj.id),
    },
  }),
});
