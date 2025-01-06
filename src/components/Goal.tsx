import { Logo } from './Logo'
import { Scorer } from '@/components/Scorer'
import { getGoalTypes } from '@/helpers/getGoalTypes'
import type { TGoal, TPlayer } from '@/types'

type TCGoal = {
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
	players,
	winningGoalScorerId,
}: TCGoal) => {
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
						firstName={goal.firstName.default}
						isSo={isSo}
						lastName={goal.lastName.default}
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
				{goal.assists.map((assist, i) => (
					<Scorer
						firstName={assist.firstName.default}
						key={i}
						lastName={assist.lastName.default}
						pickedBy={
							players?.find((player) => player.id === assist.playerId)?.picker
						}
						secondAssist={i !== 0}
						toDate={assist.assistsToDate}
					/>
				))}
			</div>
		</div>
	)
}
