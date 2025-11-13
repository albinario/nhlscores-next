import { useState, useMemo, useCallback } from 'react'
import { GameDetails } from '@/components/GameDetails'
import { Team } from '@/components/Team'
import { getStartTime } from '@/helpers/getStartTime'
import Badge from 'react-bootstrap/Badge'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import type { TGame, TPlayer, TTeamRecord } from '@/types'

type TGameProps = {
	game: TGame
	playersPicked?: TPlayer[]
	teamRecordAway?: TTeamRecord
	teamRecordHome?: TTeamRecord
}

export const Game = ({
	game,
	playersPicked = [],
	teamRecordAway,
	teamRecordHome,
}: TGameProps) => {
	const [showResults, setShowResults] = useState(false)

	const gameStatus = useMemo(() => {
		const startDateTime = new Date(game.startTimeUTC)
		const now = new Date()
		const started = startDateTime < now
		const ended = game.gameState === 'OFF'

		return {
			ended,
			started,
			startTime: getStartTime(startDateTime),
		}
	}, [game.startTimeUTC, game.gameState])

	const playersByTeam = useMemo(() => {
		const awayPlayers = playersPicked.filter(
			(player) => player.teamAbbrev === game.awayTeam.abbrev
		)
		const homePlayers = playersPicked.filter(
			(player) => player.teamAbbrev === game.homeTeam.abbrev
		)

		return { awayPlayers, homePlayers }
	}, [playersPicked, game.awayTeam.abbrev, game.homeTeam.abbrev])

	const toggleResults = useCallback(() => {
		setShowResults((prev) => !prev)
	}, [])

	return (
		<Col>
			<Card>
				<Card.Body className='p-2 text-muted'>
					{gameStatus.started && (
						<Form.Switch
							checked={showResults}
							className='position-absolute'
							name={`show-result-switcher-${game.id}`}
							onChange={toggleResults}
						/>
					)}

					{!showResults && (
						<div className='position-absolute start-50 translate-middle-x'>
							<Badge
								bg='warning'
								className='opacity-75'
								text='dark'
								style={{ fontSize: '.8em' }}
							>
								{gameStatus.startTime}
							</Badge>
						</div>
					)}

					<Row>
						<Team
							away
							playersPicked={playersByTeam.awayPlayers}
							showResults={showResults}
							team={game.awayTeam}
							teamRecord={teamRecordAway}
						/>

						<Team
							away={false}
							playersPicked={playersByTeam.homePlayers}
							showResults={showResults}
							team={game.homeTeam}
							teamRecord={teamRecordHome}
						/>
					</Row>

					{gameStatus.started && showResults && (
						<GameDetails
							key={game.id}
							gameId={game.id}
							playersPicked={playersPicked}
						/>
					)}
				</Card.Body>
			</Card>
		</Col>
	)
}
