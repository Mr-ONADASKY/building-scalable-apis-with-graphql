import nodeEnv from './util';
import { ncSchema } from './schema';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import pgConfig from './config/pg';
import { Pool } from 'pg';
import { MongoClient } from 'mongodb';
import mongo from './config/mongo';

const pgPool = new Pool(pgConfig.development);
const app = express();
const port = process.env.PORT || 3000;

const init = async () => {
  const mPool = await MongoClient.connect(mongo.development.url);

  app.use(
    '/graphql',
    graphqlHTTP({
      schema: ncSchema,
      graphiql: true,
      context: {
        pgPool,
        mPool,
      },
    }),
  );

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });

  console.log(`Running in ${nodeEnv} mode...`);
};

init();
