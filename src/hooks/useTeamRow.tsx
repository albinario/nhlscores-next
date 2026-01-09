import { useMemo } from 'react'

import { useFetchData } from '@/hooks/useFetchData'

import { pickers } from '@/app/lib/globals'
import { EPath } from '@/enums'
import type { TDates, TGame, TPlayer, TTeamRecord } from '@/types'

const useWeekGames = (games: TGame[], startDate: string, endDate: string) =>
	useMemo(
		() =>
			games.filter(
				(game) => game.gameDate >= startDate && game.gameDate <= endDate,
			),
		[games, startDate, endDate],
	)

const usePickerPlayers = (
	players: TPlayer[],
	pickerCode: string,
	exclude = false,
) =>
	useMemo(
		() =>
			players.filter((player) =>
				exclude
					? player.picker.toLowerCase() !== pickerCode
					: player.picker.toLowerCase() === pickerCode,
			),
		[players, pickerCode, exclude],
	)

export const useTeamRow = (
	dates: TDates,
	playersPicked: TPlayer[] | undefined,
	teamRecord: TTeamRecord,
) => {
	const { data: games } = useFetchData<TGame[]>(
		EPath.schedule + teamRecord.teamAbbrev.default,
	)

	const week1Games = useWeekGames(games || [], dates.week1Start, dates.week1End)
	const week2Games = useWeekGames(games || [], dates.week2Start, dates.week2End)
	const week3Games = useWeekGames(games || [], dates.week3Start, dates.week3End)
	const week4Games = useWeekGames(games || [], dates.week4Start, dates.week4End)

	const primaryPickerPlayers = usePickerPlayers(
		playersPicked || [],
		pickers[0].code,
	)
	const otherPickerPlayers = usePickerPlayers(
		playersPicked || [],
		pickers[0].code,
		true,
	)

	return {
		games,
		otherPickerPlayers,
		primaryPickerPlayers,
		week1Games,
		week2Games,
		week3Games,
		week4Games,
	}
}
