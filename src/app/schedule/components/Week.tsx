import { Fragment } from 'react'
import classNames from 'classnames'
import { Logo } from '@/components/Logo'
import moment from 'moment'
import { dateFormat } from '@/theme'
import type { TGame, TTeamSchedule } from '@/types'

export function Week({
	games,
	endDate,
	startDate,
	teamAbbrev,
	teams,
}: {
	games: TGame[]
	endDate: string
	startDate: string
	teamAbbrev: string
	teams?: TTeamSchedule[]
}) {
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
						key={game.id}
						teamAbbrev={opponent}
						className={classNames({
							back:
								moment(game.gameDate).subtract(1, 'days').format(dateFormat) ===
								prevDate,
							home,
							first: game.gameDate === startDate,
							last: game.gameDate === endDate,
						})}
					/>
				)
			})}
			<span className='ms-1'>{value}</span>
		</Fragment>
	)
}
