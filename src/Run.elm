module Run exposing (run)

import Language.Checker exposing (checkTop)
import Language.Eval as Eval exposing (runEval)
import Language.Parser exposing (parseExpr)
import Language.Pretty exposing (prettyExpr)
import Parser


run : String -> String
run expr =
    case parseExpr expr of
        Err err ->
            -- Debug.toString err
            Parser.deadEndsToString err

        Ok ex ->
            case checkTop [] ex of
                Err tyerr ->
                    Language.Checker.toString tyerr

                Ok _ ->
                    Eval.toString <| runEval ex
