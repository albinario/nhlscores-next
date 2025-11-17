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
		const { goalies: goaliesAway, skaters: skatersAway } =
			playersPickedAway.reduce(
				(acc, player) => {
					if (player.pos === EPosition.G) {
						acc.goalies.push(player)
					} else {
						acc.skaters.push(player)
					}
					return acc
				},
				{ goalies: [] as TPlayer[], skaters: [] as TPlayer[] }
			)

		const { goalies: goaliesHome, skaters: skatersHome } =
			playersPickedHome.reduce(
				(acc, player) => {
					if (player.pos === EPosition.G) {
						acc.goalies.push(player)
					} else {
						acc.skaters.push(player)
					}
					return acc
				},
				{ goalies: [] as TPlayer[], skaters: [] as TPlayer[] }
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
