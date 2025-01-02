import { Goal } from '@/components/Goal'
import { getPeriodType } from '@/helpers/getPeriodType'
import type { TPlayer, TScoring } from '@/types'

type TCScoring = {
	losingScore: number
	playersPicked?: TPlayer[]
	scoring: TScoring
	teamAbbrevAway: string
	winningGoalScorerId?: number
}

export const Scoring = ({
	losingScore,
	playersPicked,
	scoring,
	teamAbbrevAway,
	winningGoalScorerId,
}: TCScoring) => (
	<div className='period mb-1'>
		<div className='d-flex justify-content-center small text-muted'>
			{getPeriodType(scoring.periodDescriptor)}
		</div>

		{scoring.goals.map((goal, i) => (
			<Goal
				key={i}
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
