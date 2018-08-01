import { EventEmitter } from 'events';
import * as yargs from 'yargs';
import { Argv } from 'yargs';

import { runRepl } from './repl';
import { runExpr } from './runner';


yargs
  .command('run <expr>', 'run expression through the interpreter', (yargs: Argv) =>
    yargs
      .positional('expr', {
        describe: 'expression to be run',
        type: 'string'
      })
  , runExpr)
  .command('repl', 'stlc repl', {}, runRepl)
  .help()
  .argv;
