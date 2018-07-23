module Main exposing (..)

import Platform
import Ports exposing (..)
import Run exposing (run)


main =
    Platform.worker
        { init = init
        , update = update
        , subscriptions = subscriptions
        }


type alias Model =
    String


type Msg
    = GotInput String


type alias Flags =
    ()


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( "", Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotInput str ->
            let
                result =
                    run str
            in
                ( result, sendOutput result )


subscriptions : Model -> Sub Msg
subscriptions _ =
    onInput GotInput
