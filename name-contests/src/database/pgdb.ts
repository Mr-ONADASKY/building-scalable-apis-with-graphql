import { Pool } from 'pg';
import { camelizeKeys } from 'humps';
import groupBy from 'lodash.groupby';

export default (pgPool: Pool) => {
  const orderedFor = (rows: any[], collection: string[], field: string, singleObject: boolean) => {
    const data = camelizeKeys(rows);
    const inGroupsOfField = groupBy(data, field);
    return collection.map(element => {
      const elementArray = inGroupsOfField[element];
      if (elementArray) {
        return singleObject ? elementArray[0] : elementArray;
      }

      return singleObject ? {} : [];
    });
  };

  return {
    async getUsersByIds(userIds: string[]) {
      const response = await pgPool.query(
        `
            select * from users
            where id = ANY($1)`,
        [userIds],
      );

      return orderedFor(response.rows, userIds, 'id', true);
    },
    async getUsersByApiKeys(apiKeys: string[]) {
      const response = await pgPool.query(
        `
            select * from users
            where api_key = ANY($1)`,
        [apiKeys],
      );

      return orderedFor(response.rows, apiKeys, 'apiKey', true);
    },
    async getContestsForUserIds(userIds: string[]) {
      const response = await pgPool.query(
        `
      select * from contests
      where created_by = ANY($1)`,
        [userIds],
      );

      return orderedFor(response.rows, userIds, 'createdBy', false);
    },
    async getNamesForContestIds(contestIds: string[]) {
      const response = await pgPool.query(
        `
      select * from names
      where contest_id = ANY($1)`,
        [contestIds],
      );

      return orderedFor(response.rows, contestIds, 'contestId', false);
    },
  };
};
