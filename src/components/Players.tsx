import { Goalies } from '@/components/Goalies'
import { Skaters } from '@/components/Skaters'
import { Fragment } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import type { TGameBoxscoreTeam, TPlayer } from '@/types'

type TPlayersComponent = {
	playersAway: TGameBoxscoreTeam
	playersHome: TGameBoxscoreTeam
	playersPicked?: TPlayer[]
	teamAbbrevAway: string
	teamAbbrevHome: string
	winningGoalieId?: number
}

export function Players({
	playersAway,
	playersHome,
	playersPicked,
	teamAbbrevAway,
	teamAbbrevHome,
	winningGoalieId,
}: TPlayersComponent) {
	return (
		<Fragment>
			<Row xs={1} md={2}>
				<Col md={{ offset: 3 }}>
					<Goalies
						goaliesAway={playersAway.goalies}
						goaliesHome={playersHome.goalies}
						playersPicked={playersPicked?.filter(
							(player) => player.pos === 'G'
						)}
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
		</Fragment>
	)
}
