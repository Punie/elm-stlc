module Language.Syntax exposing (..)


type alias Name =
    String


type Expr
    = Var Name
    | Lit Ground
    | Prim BinOp Expr Expr
    | If Expr Expr Expr
    | App Expr Expr
    | Lam Name Type Expr


type BinOp
    = Add
    | Mul
    | And
    | Or
    | Greater
    | Lower
    | Eq


type Ground
    = LInt Int
    | LBool Bool


type Type
    = TInt
    | TBool
    | TArr Type Type
