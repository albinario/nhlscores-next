import type { TPeriodDescriptor } from '@/types'

export const getPeriodType = (periodDescriptor: TPeriodDescriptor) =>
	periodDescriptor.periodType !== 'REG'
		? periodDescriptor.periodType
		: `${periodDescriptor.number}${getPeriodTypeEnd(periodDescriptor.number)}`

const getPeriodTypeEnd = (number: number) => {
	switch (number) {
		case 1:
			return 'st'
		case 2:
			return 'nd'
		case 3:
			return 'rd'
		default:
			return ''
	}
}
