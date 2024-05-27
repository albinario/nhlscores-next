import moment from 'moment'

const getDateTitle = (date: string, dateFormat: string) => {
	const now = new Date()
	switch (date) {
		case moment(now).format(dateFormat):
			return 'Tonight'
		case moment(now).add(1, 'days').format(dateFormat):
			return 'Tomorrow night'
		case moment(now).subtract(1, 'days').format(dateFormat):
			return 'Last night'
		default:
			return date
	}
}

export default getDateTitle
