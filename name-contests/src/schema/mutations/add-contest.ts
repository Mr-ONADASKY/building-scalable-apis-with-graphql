import { ContestType } from '../types/contest';
import { GraphQLNonNull, GraphQLInputObjectType, GraphQLString } from 'graphql';
import pgdb from '../../database/pgdb';

const ContestInputType = new GraphQLInputObjectType({
  name: 'ContestInput',
  fields: {
    apiKey: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
  },
});

export default {
  type: ContestType,
  args: {
    input: { type: new GraphQLNonNull(ContestInputType) },
  },
  resolve: (obj, { input }, { pgPool }) => pgdb(pgPool).addNewContest(input),
};
