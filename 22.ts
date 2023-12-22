/** because "dashing" implies speed */
type Dasher = "💨";

/** representing dancing or grace */
type Dancer = "💃";

/** a deer, prancing */
type Prancer = "🦌";

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = "🌟";

/** for the celestial body that shares its name */
type Comet = "☄️";

/** symbolizing love, as Cupid is the god of love */
type Cupid = "❤️";

/** representing thunder, as "Donner" means thunder in German */
type Donner = "🌩️";

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = "⚡";

/** for his famous red nose */
type Rudolph = "🔴";

type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;

type ToBoolean<A extends Array<never | Reindeer>> = A[number] extends never ? true : false;

type Verify<A extends any[], Res extends { [K in Reindeer]?: boolean } = {}> = A extends [
	infer F extends Reindeer,
	...infer R,
]
	? Verify<R, Res & Record<F, true>>
	: Exclude<Reindeer, keyof Res>;

type VerifyRows<S extends any[][], Res extends any[] = []> = S extends [
	infer R extends any[],
	...infer Rest extends any[],
]
	? VerifyRows<Rest, [...Res, Verify<[...R[0], ...R[1], ...R[2]]>]>
	: ToBoolean<Res>;

type RegionsToRows<S extends any[][], Res extends any[][] = []> = S extends [
	infer R1 extends any[],
	infer R2 extends any[],
	infer R3 extends any[],
	...infer Rest extends any[],
]
	? RegionsToRows<
			Rest,
			[
				...Res,
				[...R1[0], ...R2[0], ...R3[0]],
				[...R1[1], ...R2[1], ...R3[1]],
				[...R1[2], ...R2[2], ...R3[2]],
			]
		>
	: Res;

type ColumnsToRows<S extends any[][], Res extends any[][] = []> = S extends [
	infer R1 extends any[],
	...infer Rest extends any[],
]
	? ColumnsToRows<
			Rest,
			[
				[...Res[0], R1[0][0]],
				[...Res[1], R1[0][1]],
				[...Res[2], R1[0][2]],
				[...Res[3], R1[1][0]],
				[...Res[4], R1[1][1]],
				[...Res[5], R1[1][2]],
				[...Res[6], R1[2][0]],
				[...Res[7], R1[2][1]],
				[...Res[8], R1[2][2]],
			]
		>
	: Res;

type Validate<S extends any[][]> = VerifyRows<S> &
	VerifyRows<ColumnsToRows<S>> &
	VerifyRows<RegionsToRows<S>> extends never
	? true
	: false;
