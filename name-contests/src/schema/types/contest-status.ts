import { GraphQLEnumType } from 'graphql';

export enum ContestStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export default new GraphQLEnumType({
  name: 'ContestStatus',
  values: Object.entries(ContestStatus).reduce((acc, [key, value]) => ({ ...acc, [key]: { value } }), {}),
});
