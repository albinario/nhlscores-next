import { useCallback, useState } from 'react'

import { addDays, format, parse, subDays } from 'date-fns'

import { dateFormat } from '@/app/lib/globals'

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
