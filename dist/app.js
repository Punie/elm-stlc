const EventEmitter = require('events');
const repl = require('repl');
const yargs = require('yargs');
const {Elm} = require('./stlc');

const stlc = Elm.Main.init();


yargs
  .command('run <expr>', 'run expression through the interpreter', yargs => {
    yargs
      .positional('expr', {
        describe: 'expression to be run',
        type: 'string'
      });
  }, argv => {
    stlc.ports.sendOutput
      .subscribe(res => console.log(res));

    stlc.ports.onInput
      .send(argv.expr);
  })
  .command('repl', 'stlc repl', () => {
    const emitter = new EventEmitter();

    stlc.ports.sendOutput.subscribe(res => {
      emitter.emit('interpreted', res);
    });

    function evalStlc (cmd, context, filename, callback) {
      if (cmd === '\n') {
        return callback(null);
      }

      setTimeout(() => {
        stlc.ports.onInput.send(cmd);
      }, 0);

      emitter.once('interpreted', (res) => {
        callback(null, res);
      });
    }

    function writerStlc (output) {
      return `${output}`;
    }

    repl.start({ prompt: 'λ> ', eval: evalStlc, writer: writerStlc });
  })
  .help()
  .argv;

