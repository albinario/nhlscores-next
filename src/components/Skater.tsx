import type { SkaterStats } from '../types'

interface IProps {
	skater: SkaterStats
	pickedBy?: string
}

const Skater: React.FC<IProps> = ({ skater, pickedBy }) => {
	const fullName = skater.name.default
	const lastName = fullName.replace(/^[A-Z]\. /, '')

	return (
		<tr className={pickedBy}>
			<td className='text-start text-nowrap'>
				<span className='small me-1'>{skater.sweaterNumber}</span>
				<span className='d-none d-sm-inline'>{fullName}</span>
				<span className='d-sm-none'>{lastName}</span>
				{pickedBy && <span className='small'> {pickedBy}</span>}
			</td>
			<td>{skater.goals}</td>
			<td>{skater.assists}</td>
			<td>
				{skater.plusMinus > 0 && '+'}
				{skater.plusMinus}
			</td>
			<td>{skater.shots}</td>
			<td>{skater.pim}</td>
			<td>{skater.hits}</td>
			<td>{skater.blockedShots}</td>
			<td className='text-end text-nowrap'>
				{skater.toi} | {skater.powerPlayToi} | {skater.shorthandedToi}
			</td>
		</tr>
	)
}

export default Skater
