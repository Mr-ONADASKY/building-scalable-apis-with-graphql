import nodeEnv from './util';
import { ncSchema } from './schema';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import pgConfig from './config/pg';
import { Pool } from 'pg';

const pgPool = new Pool(pgConfig.development);
const app = express();
const port = process.env.PORT || 3000;

app.use(
  '/graphql',
  graphqlHTTP({
    schema: ncSchema,
    graphiql: true,
    context: {
      pgPool,
    },
  }),
);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const init = async () => {
  console.log(`Running in ${nodeEnv} mode...`);
};


init();
