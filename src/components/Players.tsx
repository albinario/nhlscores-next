import Goalies from './Goalies'
import Skaters from './Skaters'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import type { GameBoxscoreTeam, TPlayerPicked } from '../types'

interface IProps {
	playersAway: GameBoxscoreTeam
	playersHome: GameBoxscoreTeam
	playersPicked?: TPlayerPicked[]
	teamAbbrevAway: string
	teamAbbrevHome: string
	winningGoalieId?: number
}

const Players: React.FC<IProps> = ({
	playersAway,
	playersHome,
	playersPicked,
	teamAbbrevAway,
	teamAbbrevHome,
	winningGoalieId
}) => (
	<>
		<Row xs={1} md={2}>
			<Col md={{ offset: 3 }}>
				<Goalies
					goaliesAway={playersAway.goalies}
					goaliesHome={playersHome.goalies}
					playersPicked={playersPicked?.filter((player) => player.pos === 'G')}
					teamAbbrevAway={teamAbbrevAway}
					teamAbbrevHome={teamAbbrevHome}
					winningGoalieId={winningGoalieId}
				/>
			</Col>
		</Row>
		<Row xs={1} md={2}>
			<Skaters
				defenders={playersAway.defense}
				forwards={playersAway.forwards}
				playersPicked={playersPicked?.filter(
					(player) => player.teamAbbrev === teamAbbrevAway
				)}
				teamAbbrev={teamAbbrevAway}
			/>
			<Skaters
				defenders={playersHome.defense}
				forwards={playersHome.forwards}
				playersPicked={playersPicked?.filter(
					(player) => player.teamAbbrev === teamAbbrevHome
				)}
				teamAbbrev={teamAbbrevHome}
			/>
		</Row>
	</>
)

export default Players
