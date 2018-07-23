module Utils exposing (flip, lookup)


flip : (a -> b -> c) -> b -> a -> c
flip f x y =
    f y x


lookup : comparable -> List ( comparable, a ) -> Maybe a
lookup key list =
    case list of
        [] ->
            Nothing

        ( k, v ) :: xs ->
            if k == key then
                Just v
            else
                lookup key xs
