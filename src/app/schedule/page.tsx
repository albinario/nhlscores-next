'use client'
import { useMemo } from 'react'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

import { addDays, format } from 'date-fns'

import { useFetchData } from '@/hooks/useFetchData'

import { dateFormat } from '@/app/lib/globals'
import { EPath } from '@/enums'
import type { TDates, TPlayer, TTeamRecord } from '@/types'

import { TeamRow } from './components/TeamRow'

const useScheduleDates = (): TDates => {
	return useMemo(() => {
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
}

const useProcessedTeams = (teamRecords: TTeamRecord[] | undefined) => {
	return useMemo(
		() =>
			teamRecords?.map((teamRecord) => ({
				abbrev: teamRecord.teamAbbrev.default,
				name: teamRecord.teamName.default,
				value: Number(teamRecord.leagueL10Sequence),
			})) ?? [],
		[teamRecords],
	)
}

const useSortedTeamRecords = (teamRecords: TTeamRecord[] | undefined) => {
	return useMemo(
		() =>
			teamRecords?.sort((a, b) => a.leagueL10Sequence - b.leagueL10Sequence) ??
			[],
		[teamRecords],
	)
}

const usePlayersByTeam = (playersPicked: TPlayer[] | undefined) => {
	return useMemo(() => {
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
}

export default function Schedule() {
	const { data: playersPicked } = useFetchData<TPlayer[]>(EPath.playersPicked)
	const { data: teamRecords } = useFetchData<TTeamRecord[]>(EPath.teamRecords)

	const dates = useScheduleDates()
	const teams = useProcessedTeams(teamRecords)
	const sortedTeamRecords = useSortedTeamRecords(teamRecords)
	const playersByTeam = usePlayersByTeam(playersPicked)

	return (
		<Container fluid>
			<Table size='sm'>
				<tbody className='table-schedule'>
					{sortedTeamRecords.map((teamRecord) => (
						<TeamRow
							dates={dates}
							key={teamRecord.teamAbbrev.default}
							playersPicked={playersByTeam.get(teamRecord.teamAbbrev.default)}
							teamRecord={teamRecord}
							teams={teams}
						/>
					))}
				</tbody>
			</Table>
		</Container>
	)
}
