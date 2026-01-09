import { useMemo } from 'react'

import { positionLimits } from '@/app/lib/globals'
import { EPosition } from '@/enums'
import type { TPlayer } from '@/types'

type TMissing = {
	isAll?: boolean
	playersPicked?: TPlayer[]
}

export const Missing = ({ isAll, playersPicked = [] }: TMissing) => {
	const missingCounts = useMemo(() => {
		const counts: Record<EPosition, number> = {} as Record<EPosition, number>

		Object.values(EPosition).forEach((position) => {
			if (position in positionLimits) {
				const limit = isAll
					? positionLimits[position as keyof typeof positionLimits].all
					: positionLimits[position as keyof typeof positionLimits].partial

				const currentCount = playersPicked.filter(
					(p) => p.pos === position,
				).length
				counts[position] = limit - currentCount
			}
		})

		return counts
	}, [isAll, playersPicked])

	const missingPositions = useMemo(
		() => Object.entries(missingCounts).filter(([_, count]) => count !== 0),
		[missingCounts],
	)

	if (missingPositions.length === 0) return null

	return (
		<div className='d-flex gap-3 mt-2'>
			{missingPositions.map(([position, count]) => (
				<span key={position}>
					{position}
					{count}
				</span>
			))}
		</div>
	)
}
