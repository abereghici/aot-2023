type Count<I extends any[], V extends string, Acc extends any[] = []> = I extends [
	infer F,
	...infer R,
]
	? F extends V
		? Count<R, V, [...Acc, I]>
		: Count<R, V, Acc>
	: Acc["length"];
