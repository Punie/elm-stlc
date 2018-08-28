module Language.Pretty exposing
    ( prettyExpr
    , prettyType
    )

import Language.Syntax exposing (..)
import StructuredWriter as PP exposing (Writer)


prettyExpr : Expr -> String
prettyExpr =
    PP.write << prettyExpr_ 0


prettyType : Type -> String
prettyType =
    PP.write << prettyType_ 0


parens : Writer -> Writer
parens w =
    PP.join
        [ PP.string "("
        , w
        , PP.string ")"
        ]


parensIf : Bool -> Writer -> Writer
parensIf b =
    if b then
        parens

    else
        identity


prettyExpr_ : Int -> Expr -> Writer
prettyExpr_ p expr =
    case expr of
        Var x ->
            PP.string x

        Lit (LInt x) ->
            PP.string <| String.fromInt x

        Lit (LBool True) ->
            PP.string "True"

        Lit (LBool False) ->
            PP.string "False"

        App val fun ->
            let
                f =
                    parensIf (p > 0) (prettyExpr_ (p + 1) fun)

                x =
                    prettyExpr_ p val
            in
            PP.spaced [ f, x ]

        Lam name type_ body ->
            parensIf (p > 0) <|
                PP.spaced
                    [ PP.string "λ"
                    , parens <| PP.spaced [ PP.string name, PP.string ":", prettyType_ p type_ ]
                    , PP.string "->"
                    , prettyExpr_ (p + 1) body
                    ]

        _ ->
            PP.epsilon


prettyType_ : Int -> Type -> Writer
prettyType_ p type_ =
    case type_ of
        TInt ->
            PP.string "Int"

        TBool ->
            PP.string "Bool"

        TArr a b ->
            let
                isArrow t =
                    case t of
                        TArr _ _ ->
                            True

                        _ ->
                            False
            in
            PP.spaced
                [ parensIf (isArrow a) (prettyType_ p a)
                , PP.string "->"
                , prettyType_ p b
                ]
