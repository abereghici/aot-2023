type RockPaperScissors = "👊🏻" | "🖐🏾" | "✌🏽";

type Win<L, R> = [L, R] extends ["👊🏻", "🖐🏾"] | ["🖐🏾", "✌🏽"] | ["✌🏽", "👊🏻"] ? "win" : "lose";

type WhoWins<L extends RockPaperScissors, R extends RockPaperScissors> = L extends R
	? "draw"
	: Win<L, R>;
