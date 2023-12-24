type Alley = "  ";
type MazeItem = "🎄" | "🎅" | Alley;
type DELICIOUS_COOKIES = "🍪";
type MazeMatrix = MazeItem[][];
type Directions = "up" | "down" | "left" | "right";

type Inc<N extends number, $acc extends any[] = []> = $acc["length"] extends N
  ? [...$acc, any]["length"]
  : Inc<N, [...$acc, any]>;

type Dec<N extends number, $acc extends any[] = []> = N extends 0
  ? 0
  : [...$acc, any]["length"] extends N
  ? $acc["length"]
  : Dec<N, [...$acc, any]>;

type ArrayReplaceAt<Array extends any[], X extends number, Value> = {
  [Key in keyof Array]: Key extends `${X}` ? Value : Array[Key];
};

type MatrixReplaceAt<Matrix extends any[][], Position extends [number, number], Value> = {
  [Key in keyof Matrix]: Key extends `${Position[0]}`
  ? ArrayReplaceAt<Matrix[Key], Position[1], Value>
  : Matrix[Key];
};

type GetColumn<Board extends MazeMatrix, column extends number> = {
  [key in keyof Board]: Board[key][column];
};

type FindSanta<
  board extends MazeMatrix,
  row extends number = 0,
  column extends number = 0,
  Res extends [number, number] | never = never,
> = row extends board["length"]
  ? Res
  : board[0]["length"] extends column
  ? FindSanta<board, Inc<row>, 0, Res>
  : FindSanta<board, row, Inc<column>, board[row][column] extends "🎅" ? [row, column] : Res>;

type NextMove<
  board extends MazeMatrix,
  Position extends [number, number] | never,
  D extends Directions,
> = Position extends never
  ? never
  : {
    up: [Dec<Position[0]>, Position[1]];
    down: [
      Inc<Position[0]> extends board["length"] ? Position[0] : Inc<Position[0]>,
      Position[1],
    ];
    left: [Position[0], Dec<Position[1]>];
    right: [
      Position[0],
      Inc<Position[1]> extends board["length"] ? Position[1] : Inc<Position[1]>,
    ];
  }[D];

type CanMove<board extends MazeMatrix, direction extends Directions> = NextMove<
  board,
  FindSanta<board>,
  direction
> extends infer P extends [number, number]
  ? board[P[0]][P[1]] extends "🎄"
  ? false
  : true
  : false;

type ArrayWinBoard<Array extends any[]> = {
  [Key in keyof Array]: DELICIOUS_COOKIES;
};

type MatrixWinBoard<Matrix extends any[][]> = {
  [Key in keyof Matrix]: ArrayWinBoard<Matrix[0]>;
};

type Move<board extends MazeMatrix, direction extends Directions> = "🎅" extends GetColumn<
  board,
  0
>[number]
  ? MatrixWinBoard<board>
  : CanMove<board, direction> extends true
  ? MatrixReplaceAt<
    MatrixReplaceAt<board, FindSanta<board>, "  ">,
    NextMove<board, FindSanta<board>, direction>,
    "🎅"
  >
  : board;
