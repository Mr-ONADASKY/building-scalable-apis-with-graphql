import { Pool } from 'pg';

export default (pgPool: Pool) => {
  return {
    async getUser(apiKey: string) {
      const response = await pgPool.query(
        `
            select * from users
            where api_key = $1`,
        [apiKey],
      );

      return response.rows[0];
    },
  };
};
