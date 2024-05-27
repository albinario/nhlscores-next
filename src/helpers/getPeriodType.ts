import { getPeriodTypeEnd } from './getPeriodTypeEnd'
import type { TPeriodDescriptor } from '../types'

export const getPeriodType = (periodDescriptor: TPeriodDescriptor) =>
	periodDescriptor.periodType !== 'REG'
		? periodDescriptor.periodType
		: periodDescriptor.number + getPeriodTypeEnd(periodDescriptor.number)
