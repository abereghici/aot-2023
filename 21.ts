type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
	board: TicTactToeBoard;
	state: TicTacToeState;
};

type EmptyBoard = [["  ", "  ", "  "], ["  ", "  ", "  "], ["  ", "  ", "  "]];

type NewGame = {
	board: EmptyBoard;
	state: "❌";
};

type Game = {
	board: TicTactToeBoard;
	state: TicTacToeChip;
};

type ToIndex = Record<"top" | "left", 0> &
	Record<"middle" | "center", 1> &
	Record<"bottom" | "right", 2>;

type Index<P extends TicTacToePositions> = P extends `${infer Y extends
	keyof ToIndex}-${infer X extends keyof ToIndex}`
	? [ToIndex[Y], ToIndex[X]]
	: never;

type MoveX<
	A extends any[],
	I extends number,
	S extends TicTacToeChip,
	Acc extends any[] = [],
> = A extends [infer F, ...infer R]
	? Acc["length"] extends I
		? MoveX<R, I, S, [...Acc, S]>
		: MoveX<R, I, S, [...Acc, F]>
	: Acc;

type MoveY<
	A extends any[],
	I extends [number, number],
	S extends TicTacToeChip,
	Acc extends any[] = [],
> = A extends [infer F extends any[], ...infer R]
	? Acc["length"] extends I[0]
		? MoveY<R, I, S, [...Acc, MoveX<F, I[1], S>]>
		: MoveY<R, I, S, [...Acc, F]>
	: Acc;

type NextState<S extends TicTacToeChip> = S extends "❌" ? "⭕" : "❌";

type Draw<B extends TicTactToeBoard> = TicTacToeEmptyCell extends [
	...B[0],
	...B[1],
	...B[2],
][number]
	? false
	: true;

type Win<B extends TicTactToeBoard, P extends TicTacToeChip> = [P, P, P] extends
	| B[0]
	| B[1]
	| B[2]
	| [B[0][0], B[0][1], B[0][2]]
	| [B[0][1], B[1][1], B[2][1]]
	| [B[0][2], B[1][2], B[2][2]]
	| [B[0][0], B[1][1], B[2][2]]
	? true
	: false;

type GameStatus<B extends TicTactToeBoard, S extends Game["state"]> = Win<B, S> extends true
	? `${S} Won`
	: Draw<B> extends true
		? "Draw"
		: NextState<S>;

type NextBoard<G extends Game, P extends TicTacToePositions> = MoveY<
	G["board"],
	Index<P>,
	G["state"]
>;

type IllegalMove<
	G extends Game,
	P extends TicTacToePositions,
> = G["board"][Index<P>[0]][Index<P>[1]] extends TicTacToeEmptyCell ? false : true;

type TicTacToe<G extends Game, P extends TicTacToePositions> = IllegalMove<G, P> extends true
	? G
	: {
			board: NextBoard<G, P>;
			state: GameStatus<NextBoard<G, P>, G["state"]>;
		};
