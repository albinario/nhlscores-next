type TGame = {
	awayTeam: TGameTeam
	homeTeam: TGameTeam
	id: number
	gameState: string
	startTimeUTC: string
	winningGoalie?: {
		playerId: number
	}
	winningGoalScorer?: {
		playerId: number
	}
}

type TGameResponse = {
	gameWeek: {
		games: TGame[]
	}[]
}

type TGameTeam = {
	abbrev: string
	placeName: TName
	score: number
}

type TGameBoxscore = {
	playerByGameStats: {
		awayTeam: TGameBoxscoreTeam
		homeTeam: TGameBoxscoreTeam
	}
	gameOutcome: {
		lastPeriodType: string
	}
}

type TGameBoxscoreTeam = {
	defense: TSkaterStats[]
	goalies: TGoalieStats[]
	forwards: TSkaterStats[]
}

type TSkaterStats = {
	assists: number
	blockedShots: number
	goals: number
	hits: number
	name: TName
	pim: number
	playerId: number
	plusMinus: number
	points: number
	powerPlayToi: string
	shorthandedToi: string
	shots: number
	sweaterNumber: number
	toi: string
}

type TGoalieStats = {
	name: TName
	pim: number
	playerId: number
	powerPlayGoalsAgainst: number
	savePctg: string
	saveShotsAgainst: string
	sweaterNumber: number
	toi: string
}

type TGameLanding = {
	awayTeam: TTeam
	clock: {
		timeRemaining: string
	}
	gameState: string
	homeTeam: TTeam
	summary: {
		scoring: TScoring[]
		shootout: []
	}
}

type TTeam = {
	abbrev: string
	id: number
	name: TName
	placeName: TName
	score: number
}

type TName = {
	default: string
}

type TScoring = {
	goals: TGoal[]
	periodDescriptor: TPeriodDescriptor
}

type TPeriodDescriptor = {
	number: number
	periodType: string
}

type TGoal = {
	assists: TAssist[]
	awayScore: number
	firstName: TName
	goalModifier: string
	goalsToDate: number
	homeScore: number
	lastName: TName
	playerId: number
	strength: string
	teamAbbrev: TName
	timeInPeriod: string
}

type TAssist = {
	assistsToDate: number
	firstName: TName
	lastName: TName
	playerId: number
}

type TGameDetails = {
	boxscore: TGameBoxscore
	landing: TGameLanding
}

type TPlayerPicked = {
	id: number
	name: string
	jersey: number
	pos: string
	teamAbbrev: string
	picker: string
}

type TTeamRecord = {
	losses: number
	otLosses: number
	streakCode: string
	streakCount: number
	teamAbbrev: {
		default: string
	}
	wins: number
}
