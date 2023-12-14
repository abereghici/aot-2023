type DecipherNaughtyList<S, R extends string[] = []> = S extends `${infer F}/${infer L}`
	? DecipherNaughtyList<L, [...R, F]>
	: R["length"] extends 0
	? S
	: R[number] | S;
