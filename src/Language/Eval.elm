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
            String.fromInt x ++ " : Int"

        VBool True ->
            "True : Bool"

        VBool False ->
            "False : Bool"

        VClosure name _ _ ->
            "<<closure>>"


type Evaluate t
    = Identity t


type alias Scope =
    Dict Name Value


eval : Scope -> Expr -> Evaluate Value
eval env expr =
    case expr of
        Lit (LInt x) ->
            Identity <| VInt x

        Lit (LBool x) ->
            Identity <| VBool x

        Var x ->
            Identity <|
                case Dict.get x env of
                    Just val ->
                        val

                    Nothing ->
                        Debug.todo ""

        Prim op a b ->
            let
                x =
                    extract env a

                y =
                    extract env b
            in
                primOp op x y

        If p a b ->
            let
                pred =
                    extract env p

                x =
                    eval env a

                y =
                    eval env b
            in
                ifthenelse pred x y

        Lam x _ body ->
            Identity <| VClosure x body env

        App a b ->
            let
                x =
                    extract env a

                y =
                    extract env b
            in
                apply x y


extract : Scope -> Expr -> Value
extract env x =
    case eval env x of
        Identity val ->
            val


primOp : BinOp -> Value -> Value -> Evaluate Value
primOp op a b =
    case op of
        Add ->
            case ( a, b ) of
                ( VInt x, VInt y ) ->
                    Identity <| VInt (x + y)

                _ ->
                    Debug.todo ""

        Mul ->
            case ( a, b ) of
                ( VInt x, VInt y ) ->
                    Identity <| VInt (x * y)

                _ ->
                    Debug.todo ""

        And ->
            case ( a, b ) of
                ( VBool x, VBool y ) ->
                    Identity <| VBool (x && y)

                _ ->
                    Debug.todo ""

        Or ->
            case ( a, b ) of
                ( VBool x, VBool y ) ->
                    Identity <| VBool (x || y)

                _ ->
                    Debug.todo ""

        Lower ->
            case ( a, b ) of
                ( VInt x, VInt y ) ->
                    Identity <| VBool (x < y)

                _ ->
                    Debug.todo ""

        Greater ->
            case ( a, b ) of
                ( VInt x, VInt y ) ->
                    Identity <| VBool (x > y)

                _ ->
                    Debug.todo ""

        Eq ->
            case ( a, b ) of
                ( VInt x, VInt y ) ->
                    Identity <| VBool (x == y)

                ( VBool x, VBool y ) ->
                    Identity <| VBool (x == y)

                _ ->
                    Debug.todo ""



-- _ ->
--     Debug.todo ""


ifthenelse : Value -> Evaluate Value -> Evaluate Value -> Evaluate Value
ifthenelse p a b =
    case p of
        VBool True ->
            a

        VBool False ->
            b

        _ ->
            Debug.todo ""


extend : Scope -> Name -> Value -> Scope
extend env name val =
    Dict.insert name val env


apply : Value -> Value -> Evaluate Value
apply v1 v2 =
    case v2 of
        VClosure name body env ->
            eval (extend env name v1) body

        _ ->
            Debug.todo ""


emptyScope : Scope
emptyScope =
    Dict.empty


runEval : Expr -> Value
runEval =
    extract emptyScope
