module Language.Syntax exposing
    ( BinOp(..)
    , Expr(..)
    , Ground(..)
    , Name
    , Type(..)
    , UnOp(..)
    )


type alias Name =
    String


type Expr
    = Var Name
    | Lit Ground
    | PrimU UnOp Expr
    | PrimB BinOp Expr Expr
    | If Expr Expr Expr
    | App Expr Expr
    | Lam Name Type Expr


type UnOp
    = Neg


type BinOp
    = Add
    | Sub
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
