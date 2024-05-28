export type Game = {
	id: number
	gameType: number
	gameDate: string
	startTimeUTC: string
	easternUTCOffset: string
	venueUTCOffset: string
	gameState: string
	awayTeam: Team
	homeTeam: Team
}

export type Dates = {
	week1Start: string
	week1End: string
	week2Start: string
	week2End: string
	week3Start: string
	week3End: string
	week4Start: string
	week4End: string
}

export type Player = {
	id: number
	name: string
	jersey: number
	pos: string
	teamAbbrev: string
	picker: string
}

export type PlayersResponse = {
	data: Player[]
}

export type PlayerSearch = {
	name: string
	playerId: string
	positionCode: string
	sweaterNumber: number
	teamAbbrev: string
}

export type Team = {
	abbrev: string
	name: string
	value: number
}

export type TeamRecord = {
	gamesPlayed: number
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
	placeName: {
		default: string
	}
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
	teamLogo: string
	teamName: {
		default: string
		fr: string
	}
	wins: number
}
