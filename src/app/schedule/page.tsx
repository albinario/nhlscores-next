'use client'
import { TeamRow } from './components/TeamRow'
import useFetchData from '@/hooks/useFetchData'
import moment from 'moment'
import Table from 'react-bootstrap/Table'
import { dateFormat } from '@/theme'

export default function Schedule() {
	const { data: playersPicked } = useFetchData<TPlayer[]>('players/picked')
	const { data: teamRecords } = useFetchData<TTeamRecord[]>('teamRecords')

	const teams = teamRecords?.map((teamRecord) => ({
		abbrev: teamRecord.teamAbbrev.default,
		name: teamRecord.teamName.default,
		value: Number(teamRecord.leagueL10Sequence),
	}))

	const dates: TDates = {
		week1Start: moment().format(dateFormat),
		week1End: moment().add(6, 'days').format(dateFormat),
		week2Start: moment().add(7, 'days').format(dateFormat),
		week2End: moment().add(13, 'days').format(dateFormat),
		week3Start: moment().add(14, 'days').format(dateFormat),
		week3End: moment().add(20, 'days').format(dateFormat),
		week4Start: moment().add(21, 'days').format(dateFormat),
		week4End: moment().add(27, 'days').format(dateFormat),
	}

	return (
		<Table size='sm' striped>
			<tbody>
				{teamRecords?.map((teamRecord, index) => (
					<TeamRow
						key={index}
						dates={dates}
						playersPicked={playersPicked?.filter(
							(player) => player.teamAbbrev === teamRecord.teamAbbrev.default
						)}
						teamRecord={teamRecord}
						teams={teams}
					/>
				))}
			</tbody>
		</Table>
	)
}
