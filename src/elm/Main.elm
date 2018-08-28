module Main exposing (main)

import Platform exposing (Program)
import Ports exposing (..)
import Run exposing (run)


main : Program Flags Model Msg
main =
    Platform.worker
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


type alias Model =
    ()


type Msg
    = GotInput String


type alias Flags =
    ()


init : Flags -> ( Model, Cmd Msg )
init _ =
    ( (), Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotInput str ->
            let
                result =
                    run str
            in
            ( model, output result )


subscriptions : Model -> Sub Msg
subscriptions _ =
    interpret GotInput
