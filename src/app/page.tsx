'use client'
import { dateFormat } from '@/app/lib/globals'
import { AlertBox } from '@/components/AlertBox'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Games } from '@/components/Games'
import { addDays, format, parse, subDays } from 'date-fns'
import { EPath } from '@/enums'
import { useFetchData } from '@/hooks/useFetchData'
import { useState, useCallback, useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import type { TGame } from '@/types'

const useDateNavigation = (initialDate: string) => {
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

export default function Home() {
	const initialDate = useMemo(
		() => format(subDays(new Date(), 1), dateFormat),
		[]
	)

	const { date, dateDecrease, dateIncrease } = useDateNavigation(initialDate)

	const {
		data: games,
		error,
		isLoading,
	} = useFetchData<TGame[]>(EPath.games + date)

	const hasGames = useMemo(() => games && games.length > 0, [games])

	const showNoGamesAlert = useMemo(
		() => !isLoading && !error && !hasGames,
		[isLoading, error, hasGames]
	)

	const showGames = useMemo(() => !error && hasGames, [error, hasGames])

	return (
		<Container className='d-flex flex-column justify-content-between min-vh-100'>
			<div>
				<Header
					date={date}
					dateDecrease={dateDecrease}
					dateIncrease={dateIncrease}
					isLoading={isLoading}
				/>

				{error && <AlertBox heading='Error Loading Games' text={error} />}

				{showNoGamesAlert && (
					<AlertBox
						heading='No Games Scheduled'
						text={`There are no NHL games scheduled for ${date}.`}
					/>
				)}

				{showGames && <Games games={games!} />}
			</div>

			<Footer />
		</Container>
	)
}
