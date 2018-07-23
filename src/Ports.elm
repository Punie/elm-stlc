port module Ports exposing (..)


port sendOutput : String -> Cmd msg


port onInput : (String -> msg) -> Sub msg
