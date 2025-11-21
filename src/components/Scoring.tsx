import { useMemo } from 'react'

import { Goal } from '@/components/Goal'

import { getPeriodType } from '@/helpers/getPeriodType'
import type { TPlayer, TScoring } from '@/types'

type TScoringProps = {
	losingScore: number
	playersPicked?: TPlayer[]
	scoring: TScoring
	teamAbbrevAway: string
	winningGoalScorerId?: number
}

export const Scoring = ({
	losingScore,
	playersPicked = [],
	scoring,
	teamAbbrevAway,
	winningGoalScorerId,
}: TScoringProps) => {
	const scoringData = useMemo(() => {
		const isShootout = scoring.periodDescriptor.periodType === 'SO'
		const periodType = getPeriodType(scoring.periodDescriptor)

		return {
			isShootout,
			periodType,
		}
	}, [scoring.periodDescriptor])

	return (
		<div className='period mb-1'>
			<div className='d-flex justify-content-center small text-muted'>
				{scoringData.periodType}
			</div>

			{scoring.goals.map((goal, i) => (
				<Goal
					away={goal.teamAbbrev.default === teamAbbrevAway}
					goal={goal}
					isSo={scoringData.isShootout}
					key={i}
					losingScore={losingScore}
					players={playersPicked}
					winningGoalScorerId={winningGoalScorerId}
				/>
			))}
		</div>
	)
}
