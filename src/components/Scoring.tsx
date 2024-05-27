import Goal from './Goal'
import { getPeriodType } from '../helpers/getPeriodType'
import type { TPlayerPicked, Scoring } from '../types'

interface IProps {
	losingScore: number
	playersPicked?: TPlayerPicked[]
	scoring: Scoring
	teamAbbrevAway: string
	winningGoalScorerId?: number
}

const Scoring: React.FC<IProps> = ({
	losingScore,
	playersPicked,
	scoring,
	teamAbbrevAway,
	winningGoalScorerId
}) => (
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

export default Scoring
