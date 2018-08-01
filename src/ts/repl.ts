import { App } from './stlc.d';
import { EventEmitter } from 'events';
import * as repl from 'repl';

const { Elm } = require('./stlc');

const stlc: App = Elm.Main.init();

export function runRepl() {
  const emitter = new EventEmitter();

  stlc.ports.output.subscribe(res => {
    emitter.emit('interpreted', res);
  });

  function evalStlc (cmd: string, context: Object, filename: string, callback: (a: Object | null, result?: string) => void) {
    if (cmd === '\n') {
      return callback(null);
    }

    setTimeout(() => {
      stlc.ports.interpret.send(cmd);
    }, 0);

    emitter.once('interpreted', (res) => {
      callback(null, res);
    });
  }

  function writerStlc (output: string) {
    return `${output}`;
  }

  repl.start({ prompt: 'λ> ', eval: evalStlc, writer: writerStlc });
}
