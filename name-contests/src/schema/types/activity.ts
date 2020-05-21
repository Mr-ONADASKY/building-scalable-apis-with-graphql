import { GraphQLUnionType } from 'graphql';
import { ContestType } from './contest';
import { NameType } from './name';

export const ActivityType = new GraphQLUnionType({
  name: 'Activity',
  types: [ContestType, NameType],
  resolveType: value => (value.activityType === 'contest' ? ContestType : NameType),
});
