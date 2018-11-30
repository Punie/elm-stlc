# Elm Simply Typed Lambda Calculus

This is a simple implementation of a little Simply Typed Lambda Calculus.
It is based of the wonderful (but unfortunately unfinished) book from Stephen Diehl : [Write You A Haskell](http://dev.stephendiehl.com/fun/).

## Build

```bash
$ npm install
```

```bash
$ npm run build
```

## Usage

Evaluate a simple expression right away.

```bash
$ npm run --silent stlc eval "(\x : Int . x) 42"
42 : Int
```

Or fire up the repl altogether and start playing with the language.

```bash
$ npm run --silent stlc repl
λ> (\x : Int . x) 42
42 : Int
λ> .exit
```

## Syntax

This is a light version of simply typed lambda calculus.
There are only 3 types : Int, Bool, Function (->)

Some basic operators are also implemented:

- `+`
- `-` (both prefix for negation and infix for substraction)
- `*`
- `&&`
- `||`
- `>`
- `<`
- `==`

And the `if ... then ... else ...` expressions.

## Example

Lambda for function application and its arguments:

```
(\f : Int -> Int . \x : Int . f x) (\n : Int . 10 * n) 5
```

This would be the `not` function:

```
(\b : Bool . if b then False else True)
```

Less than or equal:

```
(\n : Int . \m : Int . n < m || n == m)
```
