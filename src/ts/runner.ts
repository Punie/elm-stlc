import { App } from './stlc.d';
import { Arguments } from 'yargs';

const { Elm } = require('./stlc');

const stlc: App = Elm.Main.init();

export function runExpr(argv: Arguments): void {
  stlc.ports.output.subscribe(res => console.log(res));

  stlc.ports.interpret.send(argv.expr);
}
