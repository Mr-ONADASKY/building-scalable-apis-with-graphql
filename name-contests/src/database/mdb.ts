import { Db } from 'mongodb';
import { orderedFor } from '../util';

export default (mPool: Db) => ({
  getUsersByIds: async (userIds: string[]) => {
    const rows = await mPool
      .collection('users')
      .find({ userId: { $in: userIds } })
      .toArray();

    return orderedFor(rows, userIds, 'userId', true);
  },
});
