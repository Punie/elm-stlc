port module Ports exposing
    ( interpret
    , output
    )


port interpret : (String -> msg) -> Sub msg


port output : String -> Cmd msg
