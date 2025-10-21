import { Goalies } from '@/components/Goalies'
import { Skaters } from '@/components/Skaters'
import { EPosition } from '@/enums'
import { Fragment, useMemo } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import type { TGameBoxscoreTeam, TPlayer } from '@/types'

type TPlayers = {
	playersAway: TGameBoxscoreTeam
	playersHome: TGameBoxscoreTeam
	playersPicked?: TPlayer[]
	teamAbbrevAway: string
	teamAbbrevHome: string
	winningGoalieId?: number
}

export const Players = ({
	playersAway,
	playersHome,
	playersPicked = [],
	teamAbbrevAway,
	teamAbbrevHome,
	winningGoalieId,
}: TPlayers) => {
	const filteredPlayers = useMemo(() => {
		const goaliePlayers = playersPicked.filter(
			(player) => player.pos === EPosition.G
		)

		const awayPlayers = playersPicked.filter(
			(player) => player.teamAbbrev === teamAbbrevAway
		)

		const homePlayers = playersPicked.filter(
			(player) => player.teamAbbrev === teamAbbrevHome
		)

		return {
			awayPlayers,
			goaliePlayers,
			homePlayers,
		}
	}, [playersPicked, teamAbbrevAway, teamAbbrevHome])

	return (
		<Fragment>
			<Row xs={1} md={2}>
				<Col md={{ offset: 3 }}>
					<Goalies
						goaliesAway={playersAway.goalies}
						goaliesHome={playersHome.goalies}
						playersPicked={filteredPlayers.goaliePlayers}
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
					playersPicked={filteredPlayers.awayPlayers}
					teamAbbrev={teamAbbrevAway}
				/>

				<Skaters
					defenders={playersHome.defense}
					forwards={playersHome.forwards}
					playersPicked={filteredPlayers.homePlayers}
					teamAbbrev={teamAbbrevHome}
				/>
			</Row>
		</Fragment>
	)
}
