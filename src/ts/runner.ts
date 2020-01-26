import { App } from './stlc.d';
import { Arguments } from 'yargs';

const { Elm } = require('./stlc');

const stlc: App = Elm.Main.init();

export function runExpr(argv: Arguments): void {
  stlc.ports.output.subscribe(console.log.bind(this));

  stlc.ports.interpret.send(argv.expr as string);
}
