'use client'
import { dateFormat } from '@/app/lib/globals'
import { TeamRow } from './components/TeamRow'
import { addDays, format } from 'date-fns'
import { EQueryKey } from '@/enums'
import { useFetchData } from '@/hooks/useFetchData'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import type { TDates, TPlayer, TTeamRecord } from '@/types'

export default function Schedule() {
	const { data: playersPicked } = useFetchData<TPlayer[]>(
		EQueryKey.playersPicked
	)

	const { data: teamRecords } = useFetchData<TTeamRecord[]>(
		EQueryKey.teamRecords
	)

	const teams = teamRecords?.map((teamRecord) => ({
		abbrev: teamRecord.teamAbbrev.default,
		name: teamRecord.teamName.default,
		value: Number(teamRecord.leagueL10Sequence),
	}))

	const dates: TDates = {
		week1Start: format(new Date(), dateFormat),
		week1End: format(addDays(new Date(), 6), dateFormat),
		week2Start: format(addDays(new Date(), 7), dateFormat),
		week2End: format(addDays(new Date(), 13), dateFormat),
		week3Start: format(addDays(new Date(), 14), dateFormat),
		week3End: format(addDays(new Date(), 20), dateFormat),
		week4Start: format(addDays(new Date(), 21), dateFormat),
		week4End: format(addDays(new Date(), 27), dateFormat),
	}

	return (
		<Container fluid>
			<Table size='sm'>
				<tbody>
					{teamRecords
						?.sort((a, b) => a.leagueL10Sequence - b.leagueL10Sequence)
						.map((teamRecord) => (
							<TeamRow
								dates={dates}
								key={teamRecord.teamAbbrev.default}
								playersPicked={playersPicked?.filter(
									(player) =>
										player.teamAbbrev === teamRecord.teamAbbrev.default
								)}
								teamRecord={teamRecord}
								teams={teams}
							/>
						))}
				</tbody>
			</Table>
		</Container>
	)
}
