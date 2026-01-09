'use client'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

import { useSchedule } from '@/hooks/useSchedule'

import { TeamRow } from './components/TeamRow'

export default function Schedule() {
	const { dates, playersByTeam, sortedTeamRecords, teams } = useSchedule()

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
