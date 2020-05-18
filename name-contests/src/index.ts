import nodeEnv from './util';
import { ncSchema } from './schema';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import pgConfig from './config/pg';
import { Pool } from 'pg';
import { MongoClient } from 'mongodb';
import mongo from './config/mongo';
import pgdb from './database/pgdb';
import DataLoader from 'dataloader';

const pgPool = new Pool(pgConfig.development);
const _pgdb = pgdb(pgPool);
const app = express();
const port = process.env.PORT || 3000;

const init = async () => {
  const mPool = await MongoClient.connect(mongo.development.url);

  app.use('/graphql', (req, res) => {
    const loaders = {
      usersByIds: new DataLoader(_pgdb.getUsersByIds),
      usersByApiKeys: new DataLoader(_pgdb.getUsersByApiKeys),
      namesForContestIds: new DataLoader(_pgdb.getNamesForContestIds),
      contestsForUserIds: new DataLoader(_pgdb.getContestsForUserIds),
    };

    graphqlHTTP({
      schema: ncSchema,
      graphiql: true,
      context: {
        loaders,
        mPool,
        pgPool,
      },
    })(req, res);
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });

  console.log(`Running in ${nodeEnv} mode...`);
};

init();
