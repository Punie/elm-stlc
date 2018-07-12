module Utils exposing (flip, foldl1, lookup)


flip : (a -> b -> c) -> b -> a -> c
flip f x y =
    f y x


foldl1 : (a -> b -> b) -> List a -> b
foldl1 f l =
    case l of
        [] ->
            foldl1 f l

        x :: xs ->
            List.foldl f x xs


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
