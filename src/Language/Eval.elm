module Language.Eval exposing (..)

import Dict exposing (Dict)
import Language.Pretty exposing (prettyType)
import Language.Syntax exposing (..)


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

        Prim op a b ->
            let
                x =
                    eval env a

                y =
                    eval env b
            in
                Result.map2 (primOp op) x y
                    |> resultJoin

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
                    |> resultJoin



-- extract : Scope -> Expr -> Value
-- extract env x =
--     case eval env x of
--         Identity val ->
--             val


primOp : BinOp -> Value -> Value -> Evaluate Value
primOp op a b =
    case op of
        Add ->
            case ( a, b ) of
                ( VInt x, VInt y ) ->
                    Ok <| VInt (x + y)

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



-- _ ->
--     Debug.todo ""


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


resultJoin : Result err (Result err value) -> Result err value
resultJoin result =
    case result of
        Err err ->
            Err err

        Ok (Err err) ->
            Err err

        Ok (Ok res) ->
            Ok res
