import chai from "chai";
import chaiString from "chai-string";
import { normalize } from "path";
import {mkdirSync, rmdirSync} from "fs";
chai.use(chaiString);

export const config = {
  project: 'test-project',
  root: normalize(`${__dirname}/../e2e/tmp`)
}

before(() => {
  mkdirSync(config.root);
})
