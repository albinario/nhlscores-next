import { useMemo } from 'react'
import type { TSkaterStats } from '@/types'

type TSkater = {
	pickedBy?: string
	skater: TSkaterStats
}

export const Skater = ({ skater, pickedBy }: TSkater) => {
	const skaterData = useMemo(() => {
		const fullName = skater.name.default
		const lastName = fullName.replace(/^[A-Z]\. /, '')
		const pickerDisplay = pickedBy ? ` ${pickedBy.toUpperCase()}` : ''

		const plusMinusDisplay =
			skater.plusMinus > 0
				? `+${skater.plusMinus}`
				: skater.plusMinus.toString()

		const toiDisplay = [skater.toi, skater.powerPlayToi, skater.shorthandedToi]
			.filter((toi) => toi)
			.join(' | ')

		return {
			fullName,
			lastName,
			pickerDisplay,
			plusMinusDisplay,
			toiDisplay,
		}
	}, [
		skater.name.default,
		skater.plusMinus,
		skater.toi,
		skater.powerPlayToi,
		skater.shorthandedToi,
		pickedBy,
	])

	return (
		<tr role='row'>
			<td className={`text-start text-nowrap ${pickedBy || ''}`}>
				<span className='small me-1'>{skater.sweaterNumber}</span>
				<span className='d-none d-sm-inline'>{skaterData.fullName}</span>
				<span className='d-sm-none'>{skaterData.lastName}</span>
				{skaterData.pickerDisplay}
			</td>

			<td>{skater.goals}</td>
			<td>{skater.assists}</td>

			<td>{skaterData.plusMinusDisplay}</td>

			<td>{skater.sog}</td>
			<td>{skater.pim}</td>
			<td>{skater.hits}</td>
			<td>{skater.blockedShots}</td>

			<td className='text-end text-nowrap'>{skaterData.toiDisplay}</td>
		</tr>
	)
}
