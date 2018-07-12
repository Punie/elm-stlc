# Elm Simply Typed Lambda Calculus

## Build

Just execute the following

```bash
$ ./elm make
```

```bash
$ ./elm repl
```

and in the REPL

```elm
import Run exposing (run)

run "(\\x : Int -> x) 5"
```

should yield

```
"5 : Int"
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
