import { Logo } from './Logo'
import { Scorer } from '@/components/Scorer'
import { getGoalTypes } from '@/helpers/getGoalTypes'
import { useMemo } from 'react'
import type { TGoal, TPlayer } from '@/types'

type TGoalProps = {
	away: boolean
	goal: TGoal
	isSo: boolean
	losingScore: number
	players?: TPlayer[]
	winningGoalScorerId?: number
}

export const Goal = ({
	away,
	goal,
	isSo,
	losingScore,
	players = [],
	winningGoalScorerId,
}: TGoalProps) => {
	const goalData = useMemo(() => {
		const gameWinner = goal.playerId === winningGoalScorerId

		const goalTypes = getGoalTypes(goal, gameWinner)

		const playerMap = new Map(players.map((player) => [player.id, player]))
		const goalScorer = playerMap.get(goal.playerId)

		const assistPlayers = goal.assists.map((assist) => ({
			assist,
			player: playerMap.get(assist.playerId),
		}))

		return {
			assistPlayers,
			gameWinner,
			goalScorer,
			goalTypes,
		}
	}, [goal, losingScore, players, winningGoalScorerId])

	const layoutClasses = useMemo(
		() => ({
			assists: `d-flex small text-muted${away ? '' : ' justify-content-end'}`,
			container: `d-flex${away ? '' : ' flex-row-reverse'}`,
			logo: away ? 'me-1' : 'ms-1',
			score: away ? 'me-1' : 'ms-1',
			time: `text-muted ${away ? 'me-1' : 'ms-1'}`,
		}),
		[away]
	)

	return (
		<div className='mb-2'>
			<div className={layoutClasses.container}>
				<Logo
					className={layoutClasses.logo}
					teamAbbrev={goal.teamAbbrev.default}
				/>

				<div>
					<div className={layoutClasses.container}>
						<div className={layoutClasses.score}>
							{goal.awayScore}-{goal.homeScore}
						</div>

						{!isSo && (
							<div className={layoutClasses.time}>{goal.timeInPeriod}</div>
						)}

						<div>
							<Scorer
								firstName={goal.firstName.default}
								isSo={isSo}
								lastName={goal.lastName.default}
								pickedBy={goalData.goalScorer?.picker}
								toDate={goal.goalsToDate}
							/>

							{goalData.goalTypes.length > 0 && (
								<span className='fst-italic ms-1 opacity-75 small'>
									{goalData.goalTypes.join(' ')}
								</span>
							)}
						</div>
					</div>

					<div className={layoutClasses.assists}>
						{goalData.assistPlayers.map(({ assist, player }, i) => (
							<Scorer
								firstName={assist.firstName.default}
								key={assist.playerId}
								lastName={assist.lastName.default}
								pickedBy={player?.picker}
								secondAssist={i !== 0}
								toDate={assist.assistsToDate}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
