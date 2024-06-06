import axios from 'axios'
import { getData } from '@/helpers/getData'

export const instance = axios.create({
	baseURL: 'https://api-web.nhle.com/v1',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	timeout: 10000,
})

export const getGameDetails = async (gameId: number) => {
	const boxscore = await getData<TGameBoxscore>(
		'/gamecenter/' + gameId + '/boxscore',
		instance
	)
	const landing = await getData<TGameLanding>(
		'/gamecenter/' + gameId + '/landing',
		instance
	)
	const gameDetails: TGameDetails = { boxscore, landing }
	return gameDetails
}

export const getGamesDate = async (date: string) => {
	const response = await getData<TGamesResponse>('/schedule/' + date, instance)
	return response.gameWeek[0].games
}

export const getGamesTeam = async (teamAbbrev: string) => {
	const response = await getData<TScheduleResponse>(
		'/club-schedule-season/' + teamAbbrev + '/now',
		instance
	)
	return response.games
}

export const getTeamRecords = async () => {
	const response = await getData<TStandingsResponse>('/standings/now', instance)
	return response.standings
}
