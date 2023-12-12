type FindSanta<T> = 
	T extends [...infer A,infer L] ?
	L extends '🎅🏼' ?
	A['length']:
	FindSanta<A>:
	never;
	
