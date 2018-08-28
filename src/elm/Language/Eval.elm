module Language.Eval exposing
    ( runEval
    , toString
    )

import Dict exposing (Dict)
import Language.Pretty exposing (prettyType)
import Language.Syntax exposing (..)
import Utils


type Value
    = VInt Int
    | VBool Bool
    | VClosure Name Expr Scope


toString : Value -> String
toString val =
    case val of
        VInt x ->
            String.fromInt x

        VBool True ->
            "True"

        VBool False ->
            "False"

        VClosure name _ _ ->
            "<<closure>>"


type alias Evaluate value =
    Result String value


type alias Scope =
    Dict Name Value


eval : Scope -> Expr -> Evaluate Value
eval env expr =
    case expr of
        Lit (LInt x) ->
            Ok <| VInt x

        Lit (LBool x) ->
            Ok <| VBool x

        Var x ->
            case Dict.get x env of
                Just val ->
                    Ok val

                Nothing ->
                    Err ""

        PrimU op a ->
            let
                x =
                    eval env a
            in
            Result.map (primUOp op) x
                |> Utils.joinResults

        PrimB op a b ->
            let
                x =
                    eval env a

                y =
                    eval env b
            in
            Result.map2 (primOp op) x y
                |> Utils.joinResults

        If p a b ->
            let
                pred =
                    eval env p

                x =
                    eval env a

                y =
                    eval env b
            in
            ifthenelse pred x y

        Lam x _ body ->
            Ok <| VClosure x body env

        App a b ->
            let
                x =
                    eval env a

                y =
                    eval env b
            in
            Result.map2 apply x y
                |> Utils.joinResults


primUOp : UnOp -> Value -> Evaluate Value
primUOp op a =
    case op of
        Neg ->
            case a of
                VInt x ->
                    Ok <| VInt (negate x)

                _ ->
                    Err ""


primOp : BinOp -> Value -> Value -> Evaluate Value
primOp op a b =
    case op of
        Add ->
            case ( a, b ) of
                ( VInt x, VInt y ) ->
                    Ok <| VInt (x + y)

                _ ->
                    Err ""

        Sub ->
            case ( a, b ) of
                ( VInt x, VInt y ) ->
                    Ok <| VInt (x - y)

                _ ->
                    Err ""

        Mul ->
            case ( a, b ) of
                ( VInt x, VInt y ) ->
                    Ok <| VInt (x * y)

                _ ->
                    Err ""

        And ->
            case ( a, b ) of
                ( VBool x, VBool y ) ->
                    Ok <| VBool (x && y)

                _ ->
                    Err ""

        Or ->
            case ( a, b ) of
                ( VBool x, VBool y ) ->
                    Ok <| VBool (x || y)

                _ ->
                    Err ""

        Lower ->
            case ( a, b ) of
                ( VInt x, VInt y ) ->
                    Ok <| VBool (x < y)

                _ ->
                    Err ""

        Greater ->
            case ( a, b ) of
                ( VInt x, VInt y ) ->
                    Ok <| VBool (x > y)

                _ ->
                    Err ""

        Eq ->
            case ( a, b ) of
                ( VInt x, VInt y ) ->
                    Ok <| VBool (x == y)

                ( VBool x, VBool y ) ->
                    Ok <| VBool (x == y)

                _ ->
                    Err ""


ifthenelse : Evaluate Value -> Evaluate Value -> Evaluate Value -> Evaluate Value
ifthenelse p a b =
    case p of
        Ok (VBool True) ->
            a

        Ok (VBool False) ->
            b

        _ ->
            Err ""


extend : Scope -> Name -> Value -> Scope
extend env name val =
    Dict.insert name val env


apply : Value -> Value -> Evaluate Value
apply v1 v2 =
    case v2 of
        VClosure name body env ->
            eval (extend env name v1) body

        _ ->
            Err ""


emptyScope : Scope
emptyScope =
    Dict.empty


runEval : Expr -> Evaluate Value
runEval =
    eval emptyScope
