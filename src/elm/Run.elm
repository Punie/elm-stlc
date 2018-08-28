module Run exposing (run)

import Language.Checker exposing (checkTop)
import Language.Eval exposing (runEval)
import Language.Parser exposing (parseExpr)
import Language.Pretty exposing (prettyExpr, prettyType)
import Parser


run : String -> String
run expr =
    case parseExpr expr of
        Err err ->
            Language.Parser.deadEndsToString err

        Ok ex ->
            case checkTop [] ex of
                Err tyerr ->
                    Language.Checker.toString tyerr

                Ok ty ->
                    case runEval ex of
                        Err err ->
                            err

                        Ok result ->
                            Language.Eval.toString result ++ " : " ++ prettyType ty
