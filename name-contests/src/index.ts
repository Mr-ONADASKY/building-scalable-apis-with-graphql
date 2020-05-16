import { graphql } from 'graphql';
import nodeEnv from './util';
import { ncSchema } from './schema';

const init = async () => {
  console.log(`Running in ${nodeEnv} mode...`);

  const query = process.argv[2];

  const response = await graphql(ncSchema, query);

  console.log(response);
};

init();
