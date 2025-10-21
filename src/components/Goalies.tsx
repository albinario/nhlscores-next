import { Goalie } from '@/components/Goalie'
import { useMemo } from 'react'
import Table from 'react-bootstrap/Table'
import type { TGoalieStats, TPlayer } from '@/types'

type TGoalies = {
	goaliesAway: TGoalieStats[]
	goaliesHome: TGoalieStats[]
	playersPicked?: TPlayer[]
	teamAbbrevAway: string
	teamAbbrevHome: string
	winningGoalieId?: number
}

export const Goalies = ({
	goaliesAway,
	goaliesHome,
	playersPicked = [],
	teamAbbrevAway,
	teamAbbrevHome,
	winningGoalieId,
}: TGoalies) => {
	const goaliesWithData = useMemo(() => {
		const playerMap = new Map(
			playersPicked.map((player) => [player.id, player])
		)

		const awayGoalies = goaliesAway.map((goalie) => ({
			goalie,
			pickedBy: playerMap.get(goalie.playerId)?.picker,
			teamAbbrev: teamAbbrevAway,
			winningGoalie: goalie.playerId === winningGoalieId,
		}))

		const homeGoalies = goaliesHome.map((goalie) => ({
			goalie,
			pickedBy: playerMap.get(goalie.playerId)?.picker,
			teamAbbrev: teamAbbrevHome,
			winningGoalie: goalie.playerId === winningGoalieId,
		}))

		return { awayGoalies, homeGoalies }
	}, [
		goaliesAway,
		goaliesHome,
		playersPicked,
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
				{goaliesWithData.awayGoalies.map(
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

				{goaliesWithData.homeGoalies.map(
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
