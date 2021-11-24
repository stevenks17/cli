#!/usr/bin/env node
import { buildProgram } from './utils/register';
import { rootDir } from './config/app';
import chalk from 'chalk';

const program = buildProgram(`${rootDir}/commands`, ['shell', 'ws', 'vue']);

program.parseAsync(process.argv)
  .then(() => console.log(`Have a ${chalk.green('great')} day!`))
  .catch(console.error);
