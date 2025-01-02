import { dateFormat } from '@/app/lib/globals'
import classNames from 'classnames'
import { Logo } from '@/components/Logo'
import { format, parse, subDays } from 'date-fns'
import { Fragment } from 'react'
import type { TGame, TTeamSchedule } from '@/types'

type TCWeek = {
	games: TGame[]
	endDate: string
	startDate: string
	teamAbbrev: string
	teams?: TTeamSchedule[]
}

export const Week = ({
	games,
	endDate,
	startDate,
	teamAbbrev,
	teams,
}: TCWeek) => {
	let prevDate = ''
	let value = 0

	return (
		<Fragment>
			{games.map((game) => {
				let home = false
				let opponent = game.homeTeam.abbrev

				if (teamAbbrev === game.homeTeam.abbrev) {
					home = true
					opponent = game.awayTeam.abbrev
				}

				prevDate = game.gameDate

				const oppValue = teams?.find((team) => team.abbrev === opponent)?.value
				if (oppValue) value += oppValue

				return (
					<Logo
						className={classNames({
							back:
								format(
									subDays(parse(game.gameDate, dateFormat, new Date()), 1),
									dateFormat
								) === prevDate,
							home,
							first: game.gameDate === startDate,
							last: game.gameDate === endDate,
						})}
						key={game.id}
						teamAbbrev={opponent}
					/>
				)
			})}

			<span className='ms-1'>{value}</span>
		</Fragment>
	)
}
