module Run exposing (run)

import Language.Checker exposing (checkTop)
import Language.Eval as Eval exposing (runEval)
import Language.Parser exposing (parseExpr)


run : String -> String
run expr =
    case parseExpr expr of
        Err err ->
            Debug.toString err

        Ok ex ->
            case checkTop [] ex of
                Err tyerr ->
                    Language.Checker.showTypeError tyerr

                Ok _ ->
                    Eval.show <| runEval ex
