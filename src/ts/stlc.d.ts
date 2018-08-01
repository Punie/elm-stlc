/* Common Elm Types */

export interface Cmd<T> {
  subscribe(callback: (value: T) => void): void;
  unsubscribe(callback: (value: T) => void): void;
}

export interface Sub<T> {
  send(value: T): void;
}

/* App Types */

export interface Ports {
  output: Cmd<string>;
  interpret: Sub<string>;
}

declare interface AppInstance {
  ports: Ports;
}

declare type App = AppInstance;

declare interface Main {
  init: () => App;
}

export declare const Main: Main;
