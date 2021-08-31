import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import { rootDir } from '.';

export const db = new JsonDB(new Config(`${rootDir}/../db`, true, false));