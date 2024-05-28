import { getLogoUrl } from '@/helpers/getLogoUrl'
import { Image } from 'react-bootstrap'

export function Goalie({
	goalie,
	pickedBy,
	teamAbbrev,
	winningGoalie,
}: {
	goalie: TGoalieStats
	pickedBy?: string
	teamAbbrev: string
	winningGoalie: boolean
}) {
	return goalie.toi !== '00:00' ? (
		<tr>
			<td className='text-start'>
				<Image alt={teamAbbrev} className='me-1' src={getLogoUrl(teamAbbrev)} />
				<span className='small'>{goalie.sweaterNumber} </span>
				{goalie.name.default}
				{pickedBy && <span className={`small ${pickedBy}`}> {pickedBy}</span>}
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
