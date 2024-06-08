import { Goal } from '@/components/Goal'
import { getPeriodType } from '@/helpers/getPeriodType'
import type { TPlayer, TScoring } from '@/types'

export function Scoring({
	losingScore,
	playersPicked,
	scoring,
	teamAbbrevAway,
	winningGoalScorerId,
}: {
	losingScore: number
	playersPicked?: TPlayer[]
	scoring: TScoring
	teamAbbrevAway: string
	winningGoalScorerId?: number
}) {
	return (
		<div className='period mb-1'>
			<div className='d-flex justify-content-center small text-muted'>
				{getPeriodType(scoring.periodDescriptor)}
			</div>
			{scoring.goals.map((goal, index) => (
				<Goal
					key={index}
					away={goal.teamAbbrev.default === teamAbbrevAway}
					goal={goal}
					isSo={scoring.periodDescriptor.periodType === 'SO'}
					losingScore={losingScore}
					players={playersPicked}
					winningGoalScorerId={winningGoalScorerId}
				/>
			))}
		</div>
	)
}
