import { dateFormat } from '@/app/lib/globals'
import classNames from 'classnames'
import { Logo } from '@/components/Logo'
import { format, parse, subDays } from 'date-fns'
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
		<td className='text-end'>
			{games.map((game) => {
				let home = false
				let opponent = game.homeTeam.abbrev

				if (teamAbbrev === game.homeTeam.abbrev) {
					home = true
					opponent = game.awayTeam.abbrev
				}

				const oppValue = teams?.find((team) => team.abbrev === opponent)?.value
				if (oppValue) value += oppValue

				prevDate = game.gameDate

				return (
					<Logo
						className={classNames({
							back:
								format(
									subDays(parse(game.gameDate, dateFormat, new Date()), 1),
									dateFormat
								) === prevDate,
							first: game.gameDate === startDate,
							home,
							last: game.gameDate === endDate,
						})}
						key={game.id}
						teamAbbrev={opponent}
					/>
				)
			})}

			<span className='ms-1'>{value}</span>
		</td>
	)
}
