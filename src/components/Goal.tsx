import { Logo } from './Logo'
import { Scorer } from '@/components/Scorer'
import { getGoalTypes } from '@/helpers/getGoalTypes'
import type { TGoal, TPlayer } from '@/types'

type TGoalComponent = {
	away: boolean
	goal: TGoal
	isSo: boolean
	losingScore: number
	players?: TPlayer[]
	winningGoalScorerId?: number
}

export function Goal({
	away,
	goal,
	isSo,
	losingScore,
	players,
	winningGoalScorerId,
}: TGoalComponent) {
	const gameWinner =
		goal.playerId === winningGoalScorerId &&
		(goal.awayScore === losingScore + 1 || goal.homeScore === losingScore + 1)

	const goalTypes = getGoalTypes(goal, gameWinner)

	return (
		<div className='mb-2'>
			<div className={`d-flex ${!away && 'flex-row-reverse'}`}>
				<Logo
					className={away ? 'me-1' : 'ms-1'}
					teamAbbrev={goal.teamAbbrev.default}
				/>

				<div className={away ? 'me-1' : 'ms-1'}>
					{goal.awayScore}-{goal.homeScore}
				</div>
				{!isSo && (
					<div className={`text-muted ${away ? 'me-1' : 'ms-1'}`}>
						{goal.timeInPeriod}
					</div>
				)}

				<div>
					<Scorer
						isSo={isSo}
						name={goal.firstName.default + ' ' + goal.lastName.default}
						pickedBy={
							players?.find((player) => player.id === goal.playerId)?.picker
						}
						toDate={goal.goalsToDate}
					/>
					{!!goalTypes.length && (
						<span className='small text-muted fst-italic ms-1'>
							{goalTypes.map((goalType) => goalType).join(' ')}
						</span>
					)}
				</div>
			</div>

			<div
				className={`d-flex small text-muted ${
					away ? 'ms-4' : 'justify-content-end me-4'
				}`}
			>
				{goal.assists.map((assist, index) => (
					<Scorer
						key={index}
						last={index !== 0}
						name={assist.firstName.default + ' ' + assist.lastName.default}
						toDate={assist.assistsToDate}
						pickedBy={
							players?.find((player) => player.id === assist.playerId)?.picker
						}
					/>
				))}
			</div>
		</div>
	)
}
