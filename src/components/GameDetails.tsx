import { Players } from '@/components/Players'
import { Scoring } from '@/components/Scoring'
import { EQueryKey } from '@/enums'
import { useFetchData } from '@/hooks/useFetchData'
import { Fragment } from 'react'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'
import type { TGame, TGameDetails, TPlayer } from '@/types'

type TCGameDetails = {
	game: TGame
	playersPicked?: TPlayer[]
}

export const GameDetails = ({ game, playersPicked }: TCGameDetails) => {
	const {
		data: gameDetails,
		error,
		isLoading,
	} = useFetchData<TGameDetails>(EQueryKey.game + game.id)

	const losingScore =
		game.awayTeam.score < game.homeTeam.score
			? game.awayTeam.score
			: game.homeTeam.score

	if (isLoading)
		return (
			<div className='d-flex justify-content-center'>
				<Spinner animation='grow' size='sm' variant='warning' />
			</div>
		)

	if (error) return <Alert variant='warning'>Error loading game details</Alert>

	if (!gameDetails || !gameDetails.boxscore.playerByGameStats)
		return (
			<Alert className='mt-2' variant='secondary'>
				No game details available
			</Alert>
		)

	const ended = gameDetails.landing.gameState === 'OFF'
	const endTypeDesc = ended
		? gameDetails.boxscore.gameOutcome.lastPeriodType
		: ''
	const endType = endTypeDesc !== 'REG' ? endTypeDesc : ''

	return (
		<Fragment>
			{endType && (
				<Badge
					bg='warning'
					className='position-absolute translate-middle start-50 opacity-75'
					pill
					style={{ fontSize: '.6em', marginTop: '-18px' }}
					text='dark'
				>
					{endType}
				</Badge>
			)}

			<div className='mt-2'>
				{gameDetails.landing.summary?.scoring
					.filter((s) => !!s.goals.length)
					.map((scoring) => (
						<Scoring
							key={scoring.periodDescriptor.number}
							losingScore={losingScore}
							playersPicked={playersPicked}
							scoring={scoring}
							teamAbbrevAway={gameDetails.landing.awayTeam.abbrev}
							winningGoalScorerId={game.winningGoalScorer?.playerId}
						/>
					))}
			</div>

			<Players
				playersAway={gameDetails.boxscore.playerByGameStats.awayTeam}
				playersHome={gameDetails.boxscore.playerByGameStats.homeTeam}
				playersPicked={playersPicked}
				teamAbbrevAway={gameDetails.landing.awayTeam.abbrev}
				teamAbbrevHome={gameDetails.landing.homeTeam.abbrev}
				winningGoalieId={game.winningGoalie?.playerId}
			/>
		</Fragment>
	)
}
