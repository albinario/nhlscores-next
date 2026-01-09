import { useMemo } from 'react'

import classNames from 'classnames'

import { Logo } from '@/components/Logo'

import { isConsecutiveDay } from '@/helpers/date'
import type { TGame, TTeamSchedule } from '@/types'

type TWeek = {
	endDate: string
	games: TGame[]
	startDate: string
	teamAbbrev: string
	teams?: TTeamSchedule[]
}

export const Week = ({
	endDate,
	games,
	startDate,
	teamAbbrev,
	teams,
}: TWeek) => {
	const processedGames = useMemo(() => {
		let previousDate = ''
		let totalValue = 0

		return games.map((game, index) => {
			const isHome = teamAbbrev === game.homeTeam.abbrev
			const opponent = isHome ? game.awayTeam.abbrev : game.homeTeam.abbrev

			const teamValue =
				teams?.find((team) => team.abbrev === opponent)?.value || 0

			totalValue += teamValue

			const isBackToBack =
				index > 0 && isConsecutiveDay(game.gameDate, previousDate)

			previousDate = game.gameDate

			return {
				game,
				isBackToBack,
				isHome,
				opponent,
				teamValue,
			}
		})
	}, [games, teamAbbrev, teams])

	const totalValue = useMemo(
		() => processedGames.reduce((sum, { teamValue }) => sum + teamValue, 0),
		[processedGames],
	)

	return (
		<td className='text-end'>
			{processedGames.map(({ game, isBackToBack, isHome, opponent }) => (
				<Logo
					className={classNames({
						back: isBackToBack,
						first: game.gameDate === startDate,
						home: isHome,
						last: game.gameDate === endDate,
					})}
					key={game.id}
					teamAbbrev={opponent}
				/>
			))}

			<span className='ms-1'>{totalValue}</span>
		</td>
	)
}
