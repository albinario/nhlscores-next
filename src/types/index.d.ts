type TAssist = {
	assistsToDate: number
	firstName: TName
	lastName: TName
	playerId: number
}

type TDates = {
	week1Start: string
	week1End: string
	week2Start: string
	week2End: string
	week3Start: string
	week3End: string
	week4Start: string
	week4End: string
}

type TGame = {
	easternUTCOffset: string
	gameDate: string
	gameType: number
	startTimeUTC: string
	venueUTCOffset: string
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

type TGameDetails = {
	boxscore: TGameBoxscore
	landing: TGameLanding
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

type TGamesResponse = {
	gameWeek: {
		games: TGame[]
	}[]
}

type TGameTeam = {
	abbrev: string
	placeName: TName
	score: number
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

type TName = {
	default: string
}

type TPeriodDescriptor = {
	number: number
	periodType: string
}

type TPlayer = {
	id: number
	jersey: number
	name: string
	picker: string
	pos: string
	teamAbbrev: string
}

type TPlayersResponse = {
	data: Player[]
}

type TPlayerSearch = {
	name: string
	playerId: string
	positionCode: string
	sweaterNumber: number
	teamAbbrev: string
}

type TScheduleResponse = {
	games: TGame[]
}

type TScoring = {
	goals: TGoal[]
	periodDescriptor: TPeriodDescriptor
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

type TStandingsResponse = {
	standings: TTeamRecord[]
}

type TTeam = {
	abbrev: string
	id: number
	name: TName
	placeName: TName
	score: number
}

type TTeamRecord = {
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
	teamAbbrev: {
		default: string
	}
	teamName: {
		default: string
	}
	wins: number
}

type TTeamSchedule = {
	abbrev: string
	name: string
	value: number
}
