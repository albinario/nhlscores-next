import type { TSkaterStats } from '@/types'

type TCSkater = {
	skater: TSkaterStats
	pickedBy?: string
}

export const Skater = ({ skater, pickedBy }: TCSkater) => {
	const fullName = skater.name.default
	const lastName = fullName.replace(/^[A-Z]\. /, '')

	return (
		<tr>
			<td className={`text-start text-nowrap ${pickedBy}`}>
				<span className='small me-1'>{skater.sweaterNumber}</span>
				<span className='d-none d-sm-inline'>{fullName}</span>
				<span className='d-sm-none'>{lastName}</span>
				{pickedBy && <span className='small'> {pickedBy.toUpperCase()}</span>}
			</td>

			<td>{skater.goals}</td>
			<td>{skater.assists}</td>

			<td>
				{skater.plusMinus > 0 && '+'}
				{skater.plusMinus}
			</td>

			<td>{skater.sog}</td>
			<td>{skater.pim}</td>
			<td>{skater.hits}</td>
			<td>{skater.blockedShots}</td>

			<td className='text-end text-nowrap'>
				{[skater.toi, skater.powerPlayToi, skater.shorthandedToi]
					.filter((toi) => toi)
					.map((toi) => toi)
					.join(' | ')}
			</td>
		</tr>
	)
}
