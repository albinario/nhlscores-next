import { AlertBox } from '@/components/AlertBox'
import { Players } from '@/components/Players'
import { Scoring } from '@/components/Scoring'
import { EPath } from '@/enums'
import { useFetchData } from '@/hooks/useFetchData'
import { Fragment, useMemo } from 'react'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'
import type { TGame, TGameDetails, TPlayer } from '@/types'

type TGameDetailsProps = {
	game: TGame
	playersPicked?: TPlayer[]
}

export const GameDetails = ({
	game,
	playersPicked = [],
}: TGameDetailsProps) => {
	const {
		data: gameDetails,
		error,
		isLoading,
	} = useFetchData<TGameDetails>(EPath.game + game.id)

	const gameCalculations = useMemo(() => {
		const losingScore = Math.min(game.awayTeam.score, game.homeTeam.score)

		if (!gameDetails) {
			return {
				losingScore,
				ended: false,
				endType: '',
				scoringData: [],
			}
		}

		const ended = gameDetails.landing.gameState === 'OFF'
		const endTypeDesc = ended
			? gameDetails.boxscore.gameOutcome.lastPeriodType
			: ''
		const endType = endTypeDesc !== 'REG' ? endTypeDesc : ''

		const scoringData =
			gameDetails.landing.summary?.scoring?.filter(
				(s) => s.goals && s.goals.length > 0
			) || []

		return {
			ended,
			endType,
			losingScore,
			scoringData,
		}
	}, [game.awayTeam.score, game.homeTeam.score, gameDetails])

	if (isLoading) {
		return (
			<div className='d-flex justify-content-center' role='status'>
				<Spinner animation='grow' size='sm' variant='warning' />
			</div>
		)
	}

	if (error) {
		return <AlertBox heading='Error Loading Game Details' text={error} />
	}

	if (!gameDetails || !gameDetails.boxscore.playerByGameStats) {
		return (
			<AlertBox
				heading='No Game Details Available'
				text='Game details are not available at this time.'
			/>
		)
	}

	return (
		<Fragment>
			{gameCalculations.endType && (
				<Badge
					bg='warning'
					className='position-absolute translate-middle start-50 opacity-75'
					pill
					style={{ fontSize: '.6em', marginTop: '-18px' }}
					text='dark'
				>
					{gameCalculations.endType}
				</Badge>
			)}

			<div className='mt-2'>
				{gameCalculations.scoringData.map((scoring) => (
					<Scoring
						key={scoring.periodDescriptor.number}
						losingScore={gameCalculations.losingScore}
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
