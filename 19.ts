type Gifts = ["🛹", "🚲", "🛴", "🏄"];

type Multiply<I extends number, V, A extends any[] = []> = A["length"] extends V
	? A
	: Multiply<I, V, [...A, Gifts[I]]>;

type Rebuild<A extends any[], I extends any[] = [], C extends any[] = []> = A extends [
	infer F,
	...infer R,
]
	? I["length"] extends 4
		? Rebuild<R, [true], [...C, ...Multiply<0, F>]>
		: Rebuild<R, [...I, true], [...C, ...Multiply<I["length"], F>]>
	: C;
