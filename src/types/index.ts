export type TAssist = {
	assistsToDate: number
	firstName: TName
	lastName: TName
	playerId: number
}

export type TDates = {
	week1Start: string
	week1End: string
	week2Start: string
	week2End: string
	week3Start: string
	week3End: string
	week4Start: string
	week4End: string
}

export type TGame = {
	awayTeam: TGameTeam
	easternUTCOffset: string
	gameDate: string
	gameType: number
	gameState: string
	homeTeam: TGameTeam
	id: number
	startTimeUTC: string
	venueUTCOffset: string
	winningGoalie?: {
		playerId: number
	}
	winningGoalScorer?: {
		playerId: number
	}
}

export type TGameBoxscore = {
	playerByGameStats: {
		awayTeam: TGameBoxscoreTeam
		homeTeam: TGameBoxscoreTeam
	}
	gameOutcome: {
		lastPeriodType: string
	}
}

export type TGameBoxscoreTeam = {
	defense: TSkaterStats[]
	goalies: TGoalieStats[]
	forwards: TSkaterStats[]
}

export type TGameDetails = {
	boxscore: TGameBoxscore
	landing: TGameLanding
}

export type TGameLanding = {
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

export type TGamesResponse = {
	gameWeek: {
		games: TGame[]
	}[]
}

export type TGameTeam = {
	abbrev: string
	placeName: TName
	score: number
}

export type TGoal = {
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

export type TGoalieStats = {
	name: TName
	pim: number
	playerId: number
	powerPlayGoalsAgainst: number
	savePctg: string
	saveShotsAgainst: string
	sweaterNumber: number
	toi: string
}

export type TName = {
	default: string
}

export type TPeriodDescriptor = {
	number: number
	periodType: string
}

export type TPicker = {
	name: string
	code: string
}

export type TPlayer = {
	id: number
	jersey: number
	name: string
	picker: string
	pos: string
	teamAbbrev: string
}

export type TPlayersResponse = {
	data: TPlayer[]
}

export type TPlayerSearch = {
	name: string
	playerId: string
	positionCode: string
	sweaterNumber: number
	teamAbbrev: string
}

export type TPlayerToAdd = {
	id: string
	picker: string
}

export type TPlayerToEdit = Omit<TPlayer, 'name'>

export type TScheduleResponse = {
	games: TGame[]
}

export type TScoring = {
	goals: TGoal[]
	periodDescriptor: TPeriodDescriptor
}

export type TSkaterStats = {
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
	sog: number
	sweaterNumber: number
	toi: string
}

export type TStandingsResponse = {
	standings: TTeamRecord[]
}

export type TTeam = {
	abbrev: string
	id: number
	name: TName
	placeName: TName
	score: number
}

export type TTeamRecord = {
	goalAgainst: number
	goalFor: number
	homeGoalsAgainst: number
	homeGoalsFor: number
	homeLosses: number
	homeOtLosses: number
	homeWins: number
	l10GoalsAgainst: number
	l10GoalsFor: number
	l10Losses: number
	l10OtLosses: number
	l10Wins: number
	leagueL10Sequence: number
	leagueSequence: number
	losses: number
	otLosses: number
	pointPctg: number
	roadGoalsAgainst: number
	roadGoalsFor: number
	roadLosses: number
	roadOtLosses: number
	roadWins: number
	streakCode: string
	streakCount: number
	teamAbbrev: TName
	teamName: TName
	wins: number
}

export type TTeamSchedule = {
	abbrev: string
	name: string
	value: number
}
