import { useMemo } from 'react'
import { EPosition } from '@/enums'
import type { TPlayer } from '@/types'

type TMissing = {
	isAll?: boolean
	playersPicked?: TPlayer[]
}

// Position limits configuration
const POSITION_LIMITS = {
	[EPosition.G]: { all: 8, partial: 2 },
	[EPosition.D]: { all: 12, partial: 3 },
	[EPosition.W]: { all: 16, partial: 4 },
	[EPosition.C]: { all: 12, partial: 3 },
} as const

export const Missing = ({ isAll, playersPicked = [] }: TMissing) => {
	const missingCounts = useMemo(() => {
		const counts: Record<EPosition, number> = {} as Record<EPosition, number>

		Object.values(EPosition).forEach((position) => {
			if (position in POSITION_LIMITS) {
				const limit = isAll
					? POSITION_LIMITS[position as keyof typeof POSITION_LIMITS].all
					: POSITION_LIMITS[position as keyof typeof POSITION_LIMITS].partial

				const currentCount = playersPicked.filter(
					(p) => p.pos === position
				).length
				counts[position] = limit - currentCount
			}
		})

		return counts
	}, [isAll, playersPicked])

	const missingPositions = useMemo(() => {
		return Object.entries(missingCounts).filter(([_, count]) => count !== 0)
	}, [missingCounts])

	if (missingPositions.length === 0) {
		return null
	}

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
