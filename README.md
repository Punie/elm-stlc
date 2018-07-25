# Elm Simply Typed Lambda Calculus

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
$ npm run --silent run "(\x : Int . x) 42"
42 : Int
```

Or fire up the repl altogether and start playing with the language.

```bash
$ npm run --silent repl
λ> (\x : Int . x) 42
42 : Int
λ> .exit
```

## Syntax

This is a light version of simply typed lambda calculus.
There are only 3 types : Int, Bool, Function (->)

Some basic operators are also implemented:

- `+`
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
(\f : Int -> Int . \x : Int . f x) (\n : Int -> 10 * n) 5
```

This would be the `not` function:

```
(\b : Bool . if b then False else True)
```

Less than or equal:

```
(\n : Int -> if n < 3 || n == 3 then True else False)
```
