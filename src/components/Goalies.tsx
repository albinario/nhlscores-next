import Goalie from './Goalie'
import Table from 'react-bootstrap/Table'
import type { GoalieStats, TPlayerPicked } from '../types'

interface IProps {
	goaliesAway: GoalieStats[]
	goaliesHome: GoalieStats[]
	playersPicked?: TPlayerPicked[]
	teamAbbrevAway: string
	teamAbbrevHome: string
	winningGoalieId?: number
}

const Goalies: React.FC<IProps> = ({
	goaliesAway,
	goaliesHome,
	playersPicked,
	teamAbbrevAway,
	teamAbbrevHome,
	winningGoalieId
}) => (
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
			{goaliesAway.map((goalie) => (
				<Goalie
					key={goalie.playerId}
					goalie={goalie}
					teamAbbrev={teamAbbrevAway}
					pickedBy={
						playersPicked?.find((player) => player.id === goalie.playerId)
							?.picker
					}
					winningGoalie={goalie.playerId === winningGoalieId}
				/>
			))}
			{goaliesHome.map((goalie) => (
				<Goalie
					key={goalie.playerId}
					goalie={goalie}
					teamAbbrev={teamAbbrevHome}
					pickedBy={
						playersPicked?.find((player) => player.id === goalie.playerId)
							?.picker
					}
					winningGoalie={goalie.playerId === winningGoalieId}
				/>
			))}
		</tbody>
	</Table>
)

export default Goalies
