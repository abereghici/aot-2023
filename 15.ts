type ToArray<S, L, A extends any[] = []> = A["length"] extends L ? A : ToArray<S, L, [...A, S]>;

type BoxToys<S, N> = N extends number ? ToArray<S, N> : never;
