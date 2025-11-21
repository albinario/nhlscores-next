import { Fragment, useMemo } from 'react'

import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'

import { AlertBox } from '@/components/AlertBox'
import { Players } from '@/components/Players'
import { Scoring } from '@/components/Scoring'

import type { TGameDetails, TPlayersPicked } from '@/types'

type TGameDetailsProps = {
	error?: Error
	gameDetails?: TGameDetails
	isLoading: boolean
	playersPicked: TPlayersPicked
	winningGoalieId?: number
	winningGoalScorerId?: number
}

export const GameDetails = ({
	error,
	gameDetails,
	isLoading,
	playersPicked,
	winningGoalieId,
	winningGoalScorerId,
}: TGameDetailsProps) => {
	const gameCalculations = useMemo(() => {
		if (!gameDetails) {
			return {
				awayScore: 0,
				ended: false,
				endType: '',
				homeScore: 0,
				losingScore: 0,
				scoringData: [],
			}
		}

		const awayScore = gameDetails.boxscore.awayTeam.score
		const homeScore = gameDetails.boxscore.homeTeam.score

		const losingScore = Math.min(awayScore, homeScore)

		const ended = gameDetails.landing.gameState === 'OFF'
		const endTypeDesc = ended
			? gameDetails.boxscore.gameOutcome.lastPeriodType
			: ''
		const endType = endTypeDesc !== 'REG' ? endTypeDesc : ''

		const scoringData =
			gameDetails.landing.summary?.scoring?.filter(
				(s) => s.goals && s.goals.length > 0,
			) || []

		return {
			awayScore,
			ended,
			endType,
			homeScore,
			losingScore,
			scoringData,
		}
	}, [gameDetails])

	const classNameRootDiv =
		'position-absolute start-50 top-0 translate-middle-x mt-2'

	if (isLoading) {
		return (
			<div className={classNameRootDiv}>
				<Spinner animation='grow' size='sm' variant='warning' />
			</div>
		)
	}

	if (error) {
		return (
			<AlertBox
				heading='Error Loading Game Details'
				text={error.message || String(error)}
			/>
		)
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
			<div className={classNameRootDiv}>
				<Badge
					bg={gameCalculations.ended ? 'success' : 'primary'}
					className='me-1'
					style={{ fontSize: '.9em' }}
				>
					{gameCalculations.awayScore}
				</Badge>

				<Badge
					bg={gameCalculations.ended ? 'success' : 'primary'}
					style={{ fontSize: '.9em' }}
				>
					{gameCalculations.homeScore}
				</Badge>
			</div>

			{gameCalculations.endType && (
				<Badge
					bg='warning'
					className='position-absolute start-50 top-0 translate-middle-x mt-4 opacity-75'
					pill
					style={{ fontSize: '.6em' }}
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
						playersPicked={[...playersPicked.away, ...playersPicked.home]}
						scoring={scoring}
						teamAbbrevAway={gameDetails.landing.awayTeam.abbrev}
						winningGoalScorerId={winningGoalScorerId}
					/>
				))}
			</div>

			<Players
				playersAway={gameDetails.boxscore.playerByGameStats.awayTeam}
				playersHome={gameDetails.boxscore.playerByGameStats.homeTeam}
				playersPickedAway={playersPicked.away}
				playersPickedHome={playersPicked.home}
				teamAbbrevAway={gameDetails.landing.awayTeam.abbrev}
				teamAbbrevHome={gameDetails.landing.homeTeam.abbrev}
				winningGoalieId={winningGoalieId}
			/>
		</Fragment>
	)
}
