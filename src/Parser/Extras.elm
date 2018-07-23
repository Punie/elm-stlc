module Parser.Extras exposing (..)

import Parser exposing (..)
import Tuple


type Assoc
    = AssocNone
    | AssocLeft
    | AssocRight


type Operator a
    = Infix (Parser (a -> a -> a)) Assoc
    | Prefix (Parser (a -> a))
    | Postfix (Parser (a -> a))


type alias OperatorTable a =
    List (List (Operator a))


buildExpressionParser : OperatorTable a -> Parser a -> Parser a
buildExpressionParser operators simpleExpr =
    List.foldl makeParser simpleExpr operators


makeParser : List (Operator a) -> Parser a -> Parser a
makeParser ops term =
    let
        { rassoc, lassoc, nassoc, prefix, postfix } =
            List.foldr splitOp initOps ops

        rassocOp : Parser (a -> a -> a)
        rassocOp =
            oneOf rassoc

        lassocOp : Parser (a -> a -> a)
        lassocOp =
            oneOf lassoc

        nassocOp : Parser (a -> a -> a)
        nassocOp =
            oneOf nassoc

        prefixOp : Parser (a -> a)
        prefixOp =
            oneOf prefix

        postfixOp : Parser (a -> a)
        postfixOp =
            oneOf postfix

        ambiguous : String -> Parser (a -> a -> a) -> Parser a
        ambiguous assoc op =
            backtrackable
                (op
                    |> andThen (\_ -> problem ("ambiguous use of a " ++ assoc ++ " associative operator"))
                )

        ambiguousRight : Parser a
        ambiguousRight =
            ambiguous "right" rassocOp

        ambiguousLeft : Parser a
        ambiguousLeft =
            ambiguous "left" lassocOp

        ambiguousNon : Parser a
        ambiguousNon =
            ambiguous "non" nassocOp

        termP : Parser a
        termP =
            succeed (\pre x post -> post (pre x))
                |= prefixP
                |= term
                |= postfixP

        prefixP : Parser (a -> a)
        prefixP =
            oneOf
                [ prefixOp
                , succeed identity
                ]

        postfixP : Parser (a -> a)
        postfixP =
            oneOf
                [ postfixOp
                , succeed identity
                ]

        rassocP : a -> Parser a
        rassocP x =
            oneOf
                [ succeed (\f y -> f x y)
                    |= rassocOp
                    |= (termP |> andThen rassocP1)
                , ambiguousLeft
                , ambiguousNon
                ]

        rassocP1 : a -> Parser a
        rassocP1 x =
            oneOf
                [ rassocP x
                , succeed x
                ]

        lassocP : a -> Parser a
        lassocP x =
            oneOf
                [ succeed Tuple.pair
                    |= lassocOp
                    |= termP
                    |> andThen (\( f, y ) -> lassocP1 (f x y))
                , ambiguousRight
                , ambiguousNon
                ]

        lassocP1 : a -> Parser a
        lassocP1 x =
            oneOf
                [ lassocP x
                , succeed x
                ]

        nassocP : a -> Parser a
        nassocP x =
            succeed Tuple.pair
                |= nassocOp
                |= termP
                |> andThen (\( f, y ) -> oneOf [ ambiguousRight, ambiguousLeft, ambiguousNon, succeed (f x y) ])
    in
        termP
            |> andThen (\x -> oneOf [ rassocP x, lassocP x, nassocP x, succeed x ])


type alias Ops a =
    { rassoc : List (Parser (a -> a -> a))
    , lassoc : List (Parser (a -> a -> a))
    , nassoc : List (Parser (a -> a -> a))
    , prefix : List (Parser (a -> a))
    , postfix : List (Parser (a -> a))
    }


initOps =
    { rassoc = [], lassoc = [], nassoc = [], prefix = [], postfix = [] }


splitOp : Operator a -> Ops a -> Ops a
splitOp operator ({ rassoc, lassoc, nassoc, prefix, postfix } as ops) =
    case operator of
        Infix op assoc ->
            case assoc of
                AssocNone ->
                    { ops | nassoc = op :: ops.nassoc }

                AssocLeft ->
                    { ops | lassoc = op :: ops.lassoc }

                AssocRight ->
                    { ops | rassoc = op :: ops.rassoc }

        Prefix op ->
            { ops | prefix = op :: ops.prefix }

        Postfix op ->
            { ops | postfix = op :: ops.postfix }


many : Parser a -> Parser (List a)
many p =
    loop [] (manyHelp p)


some : Parser a -> Parser ( a, List a )
some p =
    succeed Tuple.pair
        |= p
        |. spaces
        |= many p


between : String -> String -> Parser a -> Parser a
between opening closing p =
    succeed identity
        |. symbol opening
        |. spaces
        |= p
        |. spaces
        |. symbol closing


parens : Parser a -> Parser a
parens =
    between "(" ")"


brackets : Parser a -> Parser a
brackets =
    between "[" "]"


braces : Parser a -> Parser a
braces =
    between "{" "}"


manyHelp : Parser a -> List a -> Parser (Step (List a) (List a))
manyHelp p vs =
    oneOf
        [ succeed (\v -> Loop (v :: vs))
            |= p
            |. spaces
        , succeed ()
            |> map (\_ -> Done (List.reverse vs))
        ]
