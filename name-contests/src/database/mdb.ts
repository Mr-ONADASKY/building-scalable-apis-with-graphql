import { Db } from 'mongodb';

export default (mPool: Db) => ({
  getCounts: async (user, countsField: string) => {
    const response = await mPool.collection('users').findOne({ userId: user.id });

    return response[countsField];
  },
});
