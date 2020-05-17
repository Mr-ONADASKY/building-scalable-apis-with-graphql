import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } from 'graphql';

export const MeType = new GraphQLObjectType({
  name: 'MeType',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: { type: GraphQLString, resolve: obj => `${obj.firstName} ${obj.lastName}` },
    email: { type: new GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLString },
  },
});
