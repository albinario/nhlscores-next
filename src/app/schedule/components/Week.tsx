import classNames from 'classnames'
import { getLogoUrl } from '../helpers/getLogoUrl'
import moment from 'moment'
import Image from 'react-bootstrap/Image'
import type { Game, Team } from '../types'

interface IProps {
	games: Game[]
	endDate: string
	startDate: string
	teamAbbrev: string
	teams?: Team[]
}

const Week: React.FC<IProps> = (props) => {
	let prevDate = ''
	let value = 0

	return (
		<>
			{props.games.map((game) => {
				let home = false
				let opponent = game.homeTeam.abbrev

				if (props.teamAbbrev === game.homeTeam.abbrev) {
					home = true
					opponent = game.awayTeam.abbrev
				}

				const cssClasses = classNames({
					back:
						moment(game.gameDate).subtract(1, 'days').format('YYYY-MM-DD') ===
						prevDate,
					home,
					first: game.gameDate === props.startDate,
					last: game.gameDate === props.endDate,
				})
				prevDate = game.gameDate

				const oppValue = props.teams?.find(
					(team) => team.abbrev === opponent
				)?.value
				if (oppValue) value += oppValue

				return (
					<Image
						key={game.id}
						className={cssClasses}
						src={getLogoUrl(opponent)}
						title={game.gameDate}
					/>
				)
			})}
			<span className='ms-1'>{value}</span>
		</>
	)
}

export default Week
