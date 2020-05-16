import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';

export const MeType = new GraphQLObjectType({
  name: 'MeType',
  fields: {
    id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
});
