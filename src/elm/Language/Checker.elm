module Language.Checker exposing
    ( checkTop
    , toString
    )

import Language.Pretty exposing (prettyType)
import Language.Syntax exposing (..)
import Reader as R
import Reader.Except as RE exposing (Except)
import Utils


type alias Env =
    List ( Name, Type )


extend : ( Name, Type ) -> Env -> Env
extend xt env =
    xt :: env


type TypeError
    = Mismatch Type Type
    | NotFunction Type
    | NotInScope Name


toString : TypeError -> String
toString te =
    case te of
        Mismatch t1 t2 ->
            "Couldn't match expected type '" ++ prettyType t2 ++ "' with actual type: '" ++ prettyType t1 ++ "'"

        NotFunction t ->
            "Tried to apply to non function type: '" ++ prettyType t ++ "'"

        NotInScope n ->
            "Variable not in scope: " ++ n


type alias Check a =
    Except Env TypeError a


inEnv : ( Name, Type ) -> Check a -> Check a
inEnv ( x, t ) =
    R.local <| extend ( x, t )


lookupVar : Name -> Check Type
lookupVar x =
    let
        lookup env =
            case Utils.lookup x env of
                Nothing ->
                    RE.fail (NotInScope x)

                Just e ->
                    RE.succeed e
    in
    R.ask
        |> R.andThen lookup


checkEqualTypes : Expr -> Expr -> Type -> Check Type
checkEqualTypes e1 e2 resultType =
    let
        equalTypes t1 t2 =
            if t1 == t2 then
                RE.succeed resultType

            else
                RE.fail (Mismatch t2 t1)
    in
    RE.map equalTypes (check e1)
        |> RE.andMap (check e2)
        |> RE.join


checkUnOpType : Expr -> Type -> Type -> Check Type
checkUnOpType ex opType resultType =
    let
        unOpType t =
            if t == opType then
                RE.succeed resultType

            else
                RE.fail (Mismatch t opType)
    in
    RE.map unOpType (check ex)
        |> RE.join


checkBinOpTypes : Expr -> Expr -> Type -> Type -> Check Type
checkBinOpTypes e1 e2 opType resultType =
    let
        binOpTypes t1 t2 =
            case ( opType == t1, opType == t2 ) of
                ( True, True ) ->
                    RE.succeed resultType

                ( True, False ) ->
                    RE.fail (Mismatch t2 opType)

                _ ->
                    RE.fail (Mismatch t1 opType)
    in
    RE.map binOpTypes (check e1)
        |> RE.andMap (check e2)
        |> RE.join


check : Expr -> Check Type
check expr =
    case expr of
        Lit (LInt _) ->
            RE.succeed TInt

        Lit (LBool _) ->
            RE.succeed TBool

        Var x ->
            lookupVar x

        PrimU op ex ->
            case op of
                Neg ->
                    checkUnOpType ex TInt TInt

        PrimB op e1 e2 ->
            case op of
                Eq ->
                    checkEqualTypes e1 e2 TBool

                Add ->
                    checkBinOpTypes e1 e2 TInt TInt

                Sub ->
                    checkBinOpTypes e1 e2 TInt TInt

                Mul ->
                    checkBinOpTypes e1 e2 TInt TInt

                And ->
                    checkBinOpTypes e1 e2 TBool TBool

                Or ->
                    checkBinOpTypes e1 e2 TBool TBool

                Lower ->
                    checkBinOpTypes e1 e2 TInt TBool

                Greater ->
                    checkBinOpTypes e1 e2 TInt TBool

        If p e1 e2 ->
            let
                equalTypes t1 t2 =
                    if t1 == t2 then
                        RE.succeed t1

                    else
                        RE.fail (Mismatch t2 t1)

                checkIfBool tp =
                    case tp of
                        TBool ->
                            RE.map equalTypes (check e1)
                                |> RE.andMap (check e2)
                                |> RE.join

                        _ ->
                            RE.fail (Mismatch tp TBool)
            in
            check p
                |> RE.andThen checkIfBool

        Lam x t exp ->
            inEnv ( x, t ) (check exp)
                |> RE.andThen (\rhs -> RE.succeed (TArr t rhs))

        App e1 e2 ->
            let
                checkIfFunction t1 t2 =
                    case t1 of
                        TArr a b ->
                            if a == t2 then
                                RE.succeed b

                            else
                                RE.fail (Mismatch t2 a)

                        ty ->
                            RE.fail (NotFunction ty)
            in
            RE.map checkIfFunction (check e2)
                |> RE.andMap (check e1)
                |> RE.join


runCheck : Env -> Check a -> Result TypeError a
runCheck env =
    Utils.flip R.run env


checkTop : Env -> Expr -> Result TypeError Type
checkTop env x =
    runCheck env (check x)
