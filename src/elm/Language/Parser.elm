module Language.Parser exposing
    ( deadEndsToString
    , parseExpr
    )

import Language.Syntax exposing (..)
import Parser exposing (..)
import Parser.Expression exposing (..)
import Parser.Extras exposing (..)
import Set
import Tuple


identifier : Parser Name
identifier =
    variable
        { start = Char.isLower
        , inner = \c -> Char.isAlphaNum c || c == '_' || c == '\''
        , reserved = Set.fromList [ "True", "False", "if", "then", "else", "fi" ]
        }


var : Parser Expr
var =
    succeed Var
        |= identifier
        |. spaces


num : Parser Expr
num =
    succeed (Lit << LInt)
        |= backtrackable int
        |. spaces


bool : Parser Expr
bool =
    let
        true =
            succeed (always (Lit (LBool True)))
                |= keyword "True"
                |. spaces

        false =
            succeed (always (Lit (LBool False)))
                |= keyword "False"
                |. spaces
    in
    oneOf [ true, false ]


ifthenelse : Parser Expr
ifthenelse =
    succeed If
        |. keyword "if"
        |. spaces
        |= lazy (\_ -> expr)
        |. keyword "then"
        |. spaces
        |= lazy (\_ -> expr)
        |. keyword "else"
        |. spaces
        |= lazy (\_ -> expr)


lambda : Parser Expr
lambda =
    succeed Lam
        |. symbol "\\"
        |. spaces
        |= identifier
        |. spaces
        |. symbol ":"
        |. spaces
        |= type_
        |. spaces
        |. symbol "."
        |. spaces
        |= lazy (\_ -> expr)


aexp : Parser Expr
aexp =
    oneOf
        [ parens <| lazy (\_ -> expr)
        , bool
        , num
        , var
        , ifthenelse
        , lazy (\_ -> lambda)
        ]


term : Parser Expr
term =
    let
        foldl1 f ( x, xs ) =
            List.foldl f x xs
    in
    succeed (foldl1 App)
        |= some (lazy <| \_ -> aexp)


opParser : String -> BinOp -> Parser (Expr -> Expr -> Expr)
opParser s op =
    succeed (PrimB op)
        |. symbol s
        |. spaces


unopParser : String -> UnOp -> Parser (Expr -> Expr)
unopParser s op =
    succeed (PrimU op)
        |. symbol s
        |. spaces


operators : OperatorTable Expr
operators =
    [ [ Prefix (unopParser "-" Neg) ]
    , [ Infix (opParser "*" Mul) AssocLeft ]
    , [ Infix (opParser "-" Sub) AssocLeft, Infix (opParser "+" Add) AssocLeft ]
    , [ Infix (opParser "<" Lower) AssocNone, Infix (opParser ">" Greater) AssocNone ]
    , [ Infix (opParser "==" Eq) AssocNone ]
    , [ Infix (opParser "&&" And) AssocLeft ]
    , [ Infix (opParser "||" Or) AssocLeft ]
    ]


expr : Parser Expr
expr =
    buildExpressionParser operators (lazy <| \_ -> term)


contents : Parser a -> Parser a
contents p =
    p
        |. end


tyatom : Parser Type
tyatom =
    oneOf
        [ parens (lazy <| \_ -> type_)
        , tylit
        ]


tylit : Parser Type
tylit =
    let
        intType =
            succeed (always TInt)
                |= keyword "Int"
                |. spaces

        boolType =
            succeed (always TBool)
                |= keyword "Bool"
                |. spaces
    in
    oneOf [ intType, boolType ]


type_ : Parser Type
type_ =
    let
        arrow =
            succeed TArr
                |. symbol "->"
                |. spaces

        tyops =
            [ [ Infix arrow AssocRight ]
            ]
    in
    buildExpressionParser tyops tyatom


parseExpr : String -> Result (List DeadEnd) Expr
parseExpr =
    run (contents expr)


deadEndsToString : List DeadEnd -> String
deadEndsToString deadends =
    let
        strings =
            List.map deadEndToString deadends
    in
    String.join "\n" strings


deadEndToString : DeadEnd -> String
deadEndToString { row, col, problem } =
    let
        addRowCol str =
            str ++ " (" ++ String.fromInt row ++ ":" ++ String.fromInt col ++ ")."
    in
    case problem of
        Expecting str ->
            addRowCol ("I expected the following string: `" ++ str ++ "`")

        ExpectingInt ->
            addRowCol "I expected an integer"

        ExpectingHex ->
            addRowCol "I expected an hexadecimal string"

        ExpectingOctal ->
            addRowCol "I expected an octal string"

        ExpectingBinary ->
            addRowCol "I expected a binary string"

        ExpectingFloat ->
            addRowCol "I expected a float"

        ExpectingNumber ->
            addRowCol "I expected a number"

        ExpectingVariable ->
            addRowCol "I expected a variable name"

        ExpectingSymbol str ->
            addRowCol ("I expected the following symbol: `" ++ str ++ "`")

        ExpectingKeyword str ->
            addRowCol ("I expected the following keyword: `" ++ str ++ "`")

        ExpectingEnd ->
            addRowCol "I reached an unexpected end of input"

        UnexpectedChar ->
            addRowCol "I reached an unexpected character"

        Problem str ->
            addRowCol ("I encountered the following problem: " ++ str)

        BadRepeat ->
            addRowCol "This is a bad repeat"
