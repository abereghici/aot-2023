// First version: 

// type DecipherNaughtyList<S, R extends string[] = []> = S extends `${infer F}/${infer L}`
// 	? DecipherNaughtyList<L, [...R, F]>
// 	: R[number] | S;

// Updated version: 

type DecipherNaughtyList<S> = S extends `${infer F}/${infer L}` ? DecipherNaughtyList<L> | F : S;
