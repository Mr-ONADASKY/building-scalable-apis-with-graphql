import { GraphQLObjectType, GraphQLID, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';
import ContestStatusType from './contest-status';
import { NameType } from './name';
import pgdb from '../../database/pgdb';

export const ContestType = new GraphQLObjectType({
  name: 'ContestType',
  fields: {
    id: { type: GraphQLID },
    code: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    status: { type: new GraphQLNonNull(ContestStatusType) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    names: {
      type: new GraphQLList(NameType),
      resolve: (obj, args, { pgPool }) => pgdb(pgPool).getNames(obj),
    },
  },
});
