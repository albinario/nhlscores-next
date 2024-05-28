'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Games } from '@/components/Games'
import useFetchData from '@/hooks/useFetchData'
import moment from 'moment'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'

export default function Home() {
	const dateFormat = 'YYYY-MM-DD'

	const [date, setDate] = useState(
		moment().subtract(1, 'days').format(dateFormat)
	)

	const {
		data: games,
		error,
		isLoading
	} = useFetchData<TGame[]>('games/' + date)

	const dateDecrease = () => {
		setDate(moment(date).subtract(1, 'days').format(dateFormat))
	}
	const dateIncrease = () => {
		setDate(moment(date).add(1, 'days').format(dateFormat))
	}

	return (
		<Container className='d-flex flex-column justify-content-between'>
			<div>
				<Header
					date={date}
					dateFormat={dateFormat}
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
