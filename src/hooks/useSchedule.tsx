import { useMemo } from 'react'

import { addDays, format } from 'date-fns'

import { useFetchData } from '@/hooks/useFetchData'

import { dateFormat } from '@/app/lib/globals'
import { EPath } from '@/enums'
import type { TDates, TPlayer, TTeamRecord } from '@/types'

const usePlayersByTeam = (playersPicked: TPlayer[] | undefined) =>
	useMemo(() => {
		if (!playersPicked) return new Map<string, TPlayer[]>()

		const map = new Map<string, TPlayer[]>()

		playersPicked.forEach((player) => {
			const teamAbbrev = player.teamAbbrev
			if (!map.has(teamAbbrev)) {
				map.set(teamAbbrev, [])
			}
			map.get(teamAbbrev)!.push(player)
		})

		return map
	}, [playersPicked])

const useProcessedTeams = (teamRecords: TTeamRecord[] | undefined) =>
	useMemo(
		() =>
			teamRecords?.map((teamRecord) => ({
				abbrev: teamRecord.teamAbbrev.default,
				name: teamRecord.teamName.default,
				value: Number(teamRecord.leagueL10Sequence),
			})) ?? [],
		[teamRecords],
	)

const useScheduleDates = (): TDates =>
	useMemo(() => {
		const today = new Date()

		return {
			week1Start: format(today, dateFormat),
			week1End: format(addDays(today, 6), dateFormat),
			week2Start: format(addDays(today, 7), dateFormat),
			week2End: format(addDays(today, 13), dateFormat),
			week3Start: format(addDays(today, 14), dateFormat),
			week3End: format(addDays(today, 20), dateFormat),
			week4Start: format(addDays(today, 21), dateFormat),
			week4End: format(addDays(today, 27), dateFormat),
		}
	}, [])

const useSortedTeamRecords = (teamRecords: TTeamRecord[] | undefined) =>
	useMemo(
		() =>
			teamRecords?.sort((a, b) => a.leagueL10Sequence - b.leagueL10Sequence) ??
			[],
		[teamRecords],
	)

export const useSchedule = () => {
	const { data: playersPicked } = useFetchData<TPlayer[]>(EPath.playersPicked)
	const { data: teamRecords } = useFetchData<TTeamRecord[]>(EPath.teamRecords)

	const dates = useScheduleDates()
	const teams = useProcessedTeams(teamRecords)
	const sortedTeamRecords = useSortedTeamRecords(teamRecords)
	const playersByTeam = usePlayersByTeam(playersPicked)

	return {
		dates,
		playersByTeam,
		sortedTeamRecords,
		teams,
	}
}
