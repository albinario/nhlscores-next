import axios from 'axios'

export const instance = axios.create({
	baseURL: 'https://api-web.nhle.com/v1',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)
	return response.data
}

export const getGameDetails = async (gameId: number) => {
	const boxscore = await get<TGameBoxscore>(
		'/gamecenter/' + gameId + '/boxscore'
	)
	const landing = await get<TGameLanding>('/gamecenter/' + gameId + '/landing')
	const gameDetails: TGameDetails = { boxscore, landing }
	return gameDetails
}

export const getGamesDate = async (date: string) => {
	const response = await get<TGamesResponse>('/schedule/' + date)
	return response.gameWeek[0].games
}

export const getGamesTeam = async (teamAbbrev: string) => {
	const response = await get<TScheduleResponse>(
		'/club-schedule-season/' + teamAbbrev + '/now'
	)
	return response.games
}

export const getTeamRecords = async () => {
	const response = await get<TStandingsResponse>('/standings/now')
	return response.standings
}
