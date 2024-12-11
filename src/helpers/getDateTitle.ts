import { addDays, format, subDays } from 'date-fns'

export const getDateTitle = (date: string, dateFormat: string) => {
	const now = new Date()

	switch (date) {
		case format(new Date(), dateFormat): // Today's date
			return 'Tonight'
		case format(addDays(new Date(), 1), dateFormat): // Tomorrow's date
			return 'Tomorrow night'
		case format(subDays(new Date(), 1), dateFormat): // Yesterday's date
			return 'Last night'
		default:
			return date
	}
}
