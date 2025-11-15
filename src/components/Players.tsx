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
	playersPickedAway: TPlayer[]
	playersPickedHome: TPlayer[]
	teamAbbrevAway: string
	teamAbbrevHome: string
	winningGoalieId?: number
}

export const Players = ({
	playersAway,
	playersHome,
	playersPickedAway,
	playersPickedHome,
	teamAbbrevAway,
	teamAbbrevHome,
	winningGoalieId,
}: TPlayers) => {
	const playersPicked = useMemo(() => {
		const goaliesAway = playersPickedAway.filter(
			(player) => player.pos === EPosition.G
		)

		const goaliesHome = playersPickedHome.filter(
			(player) => player.pos === EPosition.G
		)

		const skatersAway = playersPickedAway?.filter(
			(player) => player.pos !== EPosition.G
		)

		const skatersHome = playersPickedHome.filter(
			(player) => player.pos !== EPosition.G
		)

		return {
			goaliesAway,
			goaliesHome,
			skatersAway,
			skatersHome,
		}
	}, [playersPickedAway, playersPickedHome])

	return (
		<Fragment>
			<Row xs={1} md={2}>
				<Col md={{ offset: 3 }}>
					<Goalies
						goaliesAway={playersAway.goalies}
						goaliesHome={playersHome.goalies}
						goaliesPickedAway={playersPicked.goaliesAway}
						goaliesPickedHome={playersPicked.goaliesHome}
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
					skatersPicked={playersPicked.skatersAway}
					teamAbbrev={teamAbbrevAway}
				/>

				<Skaters
					defenders={playersHome.defense}
					forwards={playersHome.forwards}
					skatersPicked={playersPicked.skatersHome}
					teamAbbrev={teamAbbrevHome}
				/>
			</Row>
		</Fragment>
	)
}
