type DecipherNaughtyList<S, R extends string[] = []> = S extends `${infer F}/${infer L}`
	? DecipherNaughtyList<L, [...R, F]>
	: R[number] | S;
