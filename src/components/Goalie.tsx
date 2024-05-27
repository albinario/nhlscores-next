import { getLogoUrl } from '../helpers/getLogoUrl'
import { Image } from 'react-bootstrap'
import type { GoalieStats } from '../types'

interface IProps {
	goalie: GoalieStats
	teamAbbrev: string
	pickedBy?: string
	winningGoalie: boolean
}

const Goalie: React.FC<IProps> = ({
	goalie,
	teamAbbrev,
	pickedBy,
	winningGoalie,
}) =>
	goalie.toi !== '00:00' ? (
		<tr className={pickedBy}>
			<td className='text-start'>
				<Image className='me-1' src={getLogoUrl(teamAbbrev)} />
				<span className='small'>{goalie.sweaterNumber} </span>
				{goalie.name.default}
				{pickedBy && <span className='small'> {pickedBy}</span>}
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
	) : (
		<></>
	)

export default Goalie
