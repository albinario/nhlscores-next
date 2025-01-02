import { Logo } from './Logo'
import type { TGoalieStats } from '@/types'

type TCGoalie = {
	goalie: TGoalieStats
	pickedBy?: string
	teamAbbrev: string
	winningGoalie: boolean
}

export const Goalie = ({
	goalie,
	pickedBy,
	teamAbbrev,
	winningGoalie,
}: TCGoalie) => {
	return goalie.toi !== '00:00' ? (
		<tr>
			<td className={`text-start text-nowrap ${pickedBy}`}>
				<Logo className='me-1' teamAbbrev={teamAbbrev} />

				<span className='small'>{goalie.sweaterNumber} </span>
				{goalie.name.default}
				{pickedBy && (
					<span className={`small ${pickedBy}`}> {pickedBy.toUpperCase()}</span>
				)}
				{winningGoalie && (
					<span className='fst-italic opacity-75 small'> W</span>
				)}
			</td>

			<td>{goalie.saveShotsAgainst}</td>
			<td>{(Number(goalie.savePctg) * 100).toFixed(2)}</td>
			<td>{goalie.powerPlayGoalsAgainst}</td>
			<td>{goalie.pim}</td>
			<td className='text-end'>{goalie.toi}</td>
		</tr>
	) : null
}
