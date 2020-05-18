import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt } from 'graphql';
import { ContestType } from './contest';
import pgdb from '../../database/pgdb';
import mdb from '../../database/mdb';

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
      resolve: (obj, args, { pgPool }) => pgdb(pgPool).getContests(obj),
    },
    contestsCount: {
      type: GraphQLInt,
      resolve: (obj, args, { mPool }, { fieldName }) => mdb(mPool).getCounts(obj, fieldName),
    },
    namesCount: {
      type: GraphQLInt,
      resolve: (obj, args, { mPool }, { fieldName }) => mdb(mPool).getCounts(obj, fieldName),
    },
    votesCount: {
      type: GraphQLInt,
      resolve: (obj, args, { mPool }, { fieldName }) => mdb(mPool).getCounts(obj, fieldName),
    },
  },
});
