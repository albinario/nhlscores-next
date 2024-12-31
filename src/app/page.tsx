'use client'
import { dateFormat } from '@/app/lib/globals'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Games } from '@/components/Games'
import { format, subDays, parse, addDays } from 'date-fns'
import { EQueryKey } from '@/enums'
import { useFetchData } from '@/hooks/useFetchData'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import type { TGame } from '@/types'

export default function Home() {
	const [date, setDate] = useState(format(subDays(new Date(), 1), dateFormat))

	const {
		data: games,
		error,
		isLoading,
	} = useFetchData<TGame[]>(EQueryKey.games + date)

	const dateDecrease = () => {
		const parsedDate = parse(date, dateFormat, new Date())

		setDate(format(subDays(parsedDate, 1), dateFormat))
	}

	const dateIncrease = () => {
		const parsedDate = parse(date, dateFormat, new Date())

		setDate(format(addDays(parsedDate, 1), dateFormat))
	}

	return (
		<Container className='d-flex flex-column justify-content-between'>
			<div>
				<Header
					date={date}
					dateDecrease={dateDecrease}
					dateIncrease={dateIncrease}
					isLoading={isLoading}
				/>

				{error && <Alert variant='warning'>{error}</Alert>}

				{!isLoading && !error && !games?.length && (
					<Alert variant='secondary'>No games on this day</Alert>
				)}

				{!error && !!games?.length && <Games games={games} />}
			</div>

			<Footer />
		</Container>
	)
}
