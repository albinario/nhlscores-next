import { useCallback, useState } from 'react'

import { addDays, format, parse, subDays } from 'date-fns'

import { dateFormat } from '@/app/lib/globals'

const getDates = () => {
	const now = new Date()

	return {
		today: format(now, dateFormat),
		tomorrow: format(addDays(now, 1), dateFormat),
		yesterday: format(subDays(now, 1), dateFormat),
	}
}

export const getDateTitle = (date: string) => {
	const { today, tomorrow, yesterday } = getDates()

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

export const isConsecutiveDay = (
	currentDate: string,
	previousDate: string,
): boolean =>
	format(subDays(parse(currentDate, dateFormat, new Date()), 1), dateFormat) ===
	previousDate

export const useDateNavigation = (initialDate: string) => {
	const [date, setDate] = useState(initialDate)

	const dateDecrease = useCallback(() => {
		const parsedDate = parse(date, dateFormat, new Date())
		const newDate = format(subDays(parsedDate, 1), dateFormat)
		setDate(newDate)
	}, [date])

	const dateIncrease = useCallback(() => {
		const parsedDate = parse(date, dateFormat, new Date())
		const newDate = format(addDays(parsedDate, 1), dateFormat)
		setDate(newDate)
	}, [date])

	return {
		date,
		dateDecrease,
		dateIncrease,
	}
}
