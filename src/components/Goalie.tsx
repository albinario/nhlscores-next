import { Logo } from './Logo'
import { useMemo } from 'react'
import type { TGoalieStats } from '@/types'

type TGoalie = {
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
}: TGoalie) => {
	const goalieData = useMemo(() => {
		const hasPlayed = goalie.toi !== '00:00'
		const savePercentage = (Number(goalie.savePctg) * 100).toFixed(2)

		return {
			hasPlayed,
			savePercentage,
		}
	}, [goalie.savePctg, goalie.toi])

	const playerInfo = useMemo(
		() => ({
			name: goalie.name.default,
			jersey: goalie.sweaterNumber,
			pickerDisplay: pickedBy ? ` ${pickedBy.toUpperCase()}` : '',
			winningDisplay: winningGoalie ? ' W' : '',
		}),
		[goalie.name.default, goalie.sweaterNumber, pickedBy, winningGoalie]
	)

	if (!goalieData.hasPlayed) {
		return null
	}

	return (
		<tr>
			<td className={`text-start text-nowrap ${pickedBy || ''}`}>
				<Logo className='me-1' teamAbbrev={teamAbbrev} />
				<span className='small'>{playerInfo.jersey} </span>
				{playerInfo.name}
				{pickedBy && (
					<span className={`small ${pickedBy}`}>
						{playerInfo.pickerDisplay}
					</span>
				)}
				{winningGoalie && (
					<span className='fst-italic opacity-75 small'>
						{playerInfo.winningDisplay}
					</span>
				)}
			</td>

			<td>{goalie.saveShotsAgainst}</td>
			<td>{goalieData.savePercentage}</td>
			<td>{goalie.powerPlayGoalsAgainst}</td>
			<td>{goalie.pim}</td>
			<td className='text-end'>{goalie.toi}</td>
		</tr>
	)
}
