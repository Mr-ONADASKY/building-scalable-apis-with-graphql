import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull, GraphQLList } from 'graphql';
import ContestType from './contest';
import pgdb from '../../database/pgdb';

export const MeType = new GraphQLObjectType({
  name: 'MeType',
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
  },
});
