import { camelizeKeys } from 'humps';
import groupBy from 'lodash.groupby';

export const orderedFor = (rows: any[], collection: string[], field: string, singleObject: boolean) => {
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

export const slug = (str: string) => str.toLowerCase().replace(/[\s\W-]+/, '-');

export default {
  nodeEnv: process.env.NODE_ENV || 'development',
};
