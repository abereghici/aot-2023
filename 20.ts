type Letters = {
	A: ["█▀█ ", "█▀█ ", "▀ ▀ "];
	B: ["█▀▄ ", "█▀▄ ", "▀▀  "];
	C: ["█▀▀ ", "█ ░░", "▀▀▀ "];
	E: ["█▀▀ ", "█▀▀ ", "▀▀▀ "];
	H: ["█ █ ", "█▀█ ", "▀ ▀ "];
	I: ["█ ", "█ ", "▀ "];
	M: ["█▄░▄█ ", "█ ▀ █ ", "▀ ░░▀ "];
	N: ["█▄░█ ", "█ ▀█ ", "▀ ░▀ "];
	P: ["█▀█ ", "█▀▀ ", "▀ ░░"];
	R: ["█▀█ ", "██▀ ", "▀ ▀ "];
	S: ["█▀▀ ", "▀▀█ ", "▀▀▀ "];
	T: ["▀█▀ ", "░█ ░", "░▀ ░"];
	Y: ["█ █ ", "▀█▀ ", "░▀ ░"];
	W: ["█ ░░█ ", "█▄▀▄█ ", "▀ ░ ▀ "];
	" ": ["░", "░", "░"];
	":": ["#", "░", "#"];
	"*": ["░", "#", "░"];
};

type BuildRow<T extends string, Res extends string[] = ["", "", ""]> = T extends `${infer L extends
	keyof Letters}${infer R}`
	? BuildRow<
			R,
			[`${Res[0]}${Letters[L][0]}`, `${Res[1]}${Letters[L][1]}`, `${Res[2]}${Letters[L][2]}`]
		>
	: Res;

type ToAsciiArt<T extends string, Res extends string[] = []> = T extends `${infer L}\n${infer R}`
	? ToAsciiArt<R, [...Res, ...BuildRow<Uppercase<L>>]>
	: [...Res, ...BuildRow<Uppercase<T>>];
