import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt } from 'graphql';
import { ContestType } from './contest';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: { type: GraphQLString, resolve: obj => `${obj.firstName} ${obj.lastName}` },
    email: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLString },
    contests: {
      type: new GraphQLList(ContestType),
      resolve: (obj, args, { loaders }) => loaders.contestsForUserIds.load(obj.id),
    },
    contestsCount: {
      type: GraphQLInt,
      resolve: (obj, args, { loaders }, { fieldName }) =>
        loaders.mdb.usersByIds.load(obj.id).then(res => res[fieldName]),
    },
    namesCount: {
      type: GraphQLInt,
      resolve: (obj, args, { loaders }, { fieldName }) =>
        loaders.mdb.usersByIds.load(obj.id).then(res => res[fieldName]),
    },
    votesCount: {
      type: GraphQLInt,
      resolve: (obj, args, { loaders }, { fieldName }) =>
        loaders.mdb.usersByIds.load(obj.id).then(res => res[fieldName]),
    },
  },
});
