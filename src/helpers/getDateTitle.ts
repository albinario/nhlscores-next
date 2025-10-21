import { addDays, format, subDays } from 'date-fns'
import { dateFormat } from '@/app/lib/globals'

const getCachedDates = () => {
	const now = new Date()

	return {
		today: format(now, dateFormat),
		tomorrow: format(addDays(now, 1), dateFormat),
		yesterday: format(subDays(now, 1), dateFormat),
	}
}

export const getDateTitle = (date: string) => {
	const { today, tomorrow, yesterday } = getCachedDates()

	switch (date) {
		case today:
			return 'Tonight'
		case tomorrow:
			return 'Tomorrow night'
		case yesterday:
			return 'Last night'
		default:
			return date
	}
}
