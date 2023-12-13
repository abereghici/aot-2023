type DayCounter<Start extends number, End extends number, Acc extends number[] = []> = 
		Start extends End ?
		[...Acc,End][number]:
		DayCounter<[...Acc,Start]['length'],End,[...Acc,Start]>
