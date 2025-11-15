import { Goalie } from '@/components/Goalie'
import { useMemo } from 'react'
import Table from 'react-bootstrap/Table'
import type { TGoalieStats, TPlayer } from '@/types'

type TGoalies = {
	goaliesAway: TGoalieStats[]
	goaliesHome: TGoalieStats[]
	goaliesPickedAway: TPlayer[]
	goaliesPickedHome: TPlayer[]
	teamAbbrevAway: string
	teamAbbrevHome: string
	winningGoalieId?: number
}

export const Goalies = ({
	goaliesAway,
	goaliesHome,
	goaliesPickedAway,
	goaliesPickedHome,
	teamAbbrevAway,
	teamAbbrevHome,
	winningGoalieId,
}: TGoalies) => {
	const goaliesWithData = useMemo(() => {
		const goalieMapAway = new Map(
			goaliesPickedAway.map((goalie) => [goalie.id, goalie])
		)

		const goalieMapHome = new Map(
			goaliesPickedHome.map((goalie) => [goalie.id, goalie])
		)

		const away = goaliesAway.map((goalie) => ({
			goalie,
			pickedBy: goalieMapAway.get(goalie.playerId)?.picker,
			teamAbbrev: teamAbbrevAway,
			winningGoalie: goalie.playerId === winningGoalieId,
		}))

		const home = goaliesHome.map((goalie) => ({
			goalie,
			pickedBy: goalieMapHome.get(goalie.playerId)?.picker,
			teamAbbrev: teamAbbrevHome,
			winningGoalie: goalie.playerId === winningGoalieId,
		}))

		return { away, home }
	}, [
		goaliesAway,
		goaliesHome,
		goaliesPickedAway,
		goaliesPickedHome,
		teamAbbrevAway,
		teamAbbrevHome,
		winningGoalieId,
	])

	return (
		<Table borderless className='small text-center' size='sm'>
			<thead>
				<tr>
					<th></th>
					<th>Saves</th>
					<th>%</th>
					<th>PP</th>
					<th>PIM</th>
					<th className='pe-0 text-end'>TOI</th>
				</tr>
			</thead>

			<tbody>
				{goaliesWithData.away.map(
					({ goalie, pickedBy, teamAbbrev, winningGoalie }) => (
						<Goalie
							key={goalie.playerId}
							goalie={goalie}
							teamAbbrev={teamAbbrev}
							pickedBy={pickedBy}
							winningGoalie={winningGoalie}
						/>
					)
				)}

				{goaliesWithData.home.map(
					({ goalie, pickedBy, teamAbbrev, winningGoalie }) => (
						<Goalie
							key={goalie.playerId}
							goalie={goalie}
							teamAbbrev={teamAbbrev}
							pickedBy={pickedBy}
							winningGoalie={winningGoalie}
						/>
					)
				)}
			</tbody>
		</Table>
	)
}
