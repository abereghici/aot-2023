type FindIndex<A extends any[], C, R extends any[] = []> = A extends [infer F, ...infer Rest]
	? F extends C
		? [R["length"], F]
		: FindIndex<Rest, C, [...R, F]>
	: "";

type Reduce<F extends any[][]> = F extends [infer F extends any[], ...infer R extends any[]]
	? [FindIndex<F, "🎅🏼">[0], ...Reduce<R>]
	: F;

type FindSanta<F extends any[][]> = FindIndex<Reduce<F>, number>;
