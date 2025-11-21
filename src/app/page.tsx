'use client'
import { useMemo } from 'react'

import Container from 'react-bootstrap/Container'

import { format, subDays } from 'date-fns'

import { AlertBox } from '@/components/AlertBox'
import { Footer } from '@/components/Footer'
import { Games } from '@/components/Games'
import { Header } from '@/components/Header'

import { useFetchData } from '@/hooks/useFetchData'

import { dateFormat } from '@/app/lib/globals'
import { EPath } from '@/enums'
import { useDateNavigation } from '@/helpers/page'
import type { TGame, TPlayer } from '@/types'

export default function Home() {
	const initialDate = useMemo(
		() => format(subDays(new Date(), 1), dateFormat),
		[],
	)

	const { date, dateDecrease, dateIncrease } = useDateNavigation(initialDate)

	const {
		data: games,
		error,
		isLoading: isLoadingGames,
	} = useFetchData<TGame[]>(EPath.games + date)

	const hasGames = useMemo(() => games && games.length > 0, [games])

	const { data: playersPicked, isLoading: isLoadingPlayersPicked } =
		useFetchData<TPlayer[]>(hasGames ? EPath.playersPicked : null)

	const isLoading = isLoadingGames || isLoadingPlayersPicked

	const showNoGamesAlert = useMemo(
		() => !isLoading && !error && !hasGames,
		[isLoading, error, hasGames],
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

				{showGames && <Games games={games!} playersPicked={playersPicked} />}
			</div>

			<Footer />
		</Container>
	)
}
