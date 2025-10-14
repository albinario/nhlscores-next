'use client'
import { useMemo } from 'react'
import { dateFormat } from '@/app/lib/globals'
import { TeamRow } from './components/TeamRow'
import { addDays, format } from 'date-fns'
import { EPath } from '@/enums'
import { useFetchData } from '@/hooks/useFetchData'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import type { TDates, TPlayer, TTeamRecord } from '@/types'

const useScheduleDates = (): TDates => {
	return useMemo(
		() => ({
			week1Start: format(new Date(), dateFormat),
			week1End: format(addDays(new Date(), 6), dateFormat),
			week2Start: format(addDays(new Date(), 7), dateFormat),
			week2End: format(addDays(new Date(), 13), dateFormat),
			week3Start: format(addDays(new Date(), 14), dateFormat),
			week3End: format(addDays(new Date(), 20), dateFormat),
			week4Start: format(addDays(new Date(), 21), dateFormat),
			week4End: format(addDays(new Date(), 27), dateFormat),
		}),
		[]
	)
}

const useProcessedTeams = (teamRecords: TTeamRecord[] | undefined) => {
	return useMemo(
		() =>
			teamRecords?.map((teamRecord) => ({
				abbrev: teamRecord.teamAbbrev.default,
				name: teamRecord.teamName.default,
				value: Number(teamRecord.leagueL10Sequence),
			})) || [],
		[teamRecords]
	)
}

const useSortedTeamRecords = (teamRecords: TTeamRecord[] | undefined) => {
	return useMemo(
		() =>
			teamRecords?.sort((a, b) => a.leagueL10Sequence - b.leagueL10Sequence) ||
			[],
		[teamRecords]
	)
}

export default function Schedule() {
	const { data: playersPicked } = useFetchData<TPlayer[]>(EPath.playersPicked)
	const { data: teamRecords } = useFetchData<TTeamRecord[]>(EPath.teamRecords)

	const dates = useScheduleDates()
	const teams = useProcessedTeams(teamRecords)
	const sortedTeamRecords = useSortedTeamRecords(teamRecords)

	const playersByTeam = useMemo(() => {
		if (!playersPicked) return new Map()

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
