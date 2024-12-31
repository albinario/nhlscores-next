import { addDays, format, subDays } from 'date-fns'
import { dateFormat } from '@/app/lib/globals'

export const getDateTitle = (date: string) => {
	switch (date) {
		case format(new Date(), dateFormat):
			return 'Tonight'
		case format(addDays(new Date(), 1), dateFormat):
			return 'Tomorrow night'
		case format(subDays(new Date(), 1), dateFormat):
			return 'Last night'
		default:
			return date
	}
}
