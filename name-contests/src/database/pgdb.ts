import { Pool } from 'pg';
import { camelizeKeys } from 'humps';

export default (pgPool: Pool) => {
  return {
    async getUserById(userId: string) {
      const response = await pgPool.query(
        `
            select * from users
            where id = $1`,
        [userId],
      );

      return camelizeKeys(response.rows[0]);
    },
    async getUserByApiKey(apiKey: string) {
      const response = await pgPool.query(
        `
            select * from users
            where api_key = $1`,
        [apiKey],
      );

      return camelizeKeys(response.rows[0]);
    },
    async getContests(user) {
      const response = await pgPool.query(
        `
      select * from contests
      where created_by = $1`,
        [user.id],
      );

      return camelizeKeys(response.rows);
    },
    async getNames(contest) {
      const response = await pgPool.query(
        `
      select * from names
      where contest_id = $1`,
        [contest.id],
      );

      return camelizeKeys(response.rows);
    },
  };
};
