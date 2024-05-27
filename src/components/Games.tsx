import Game from './Game'
import { useGetPlayersPicked } from '../hooks/useGetPlayersPicked'
import { useGetTeamRecords } from '../hooks/useGetTeamRecords'
import Row from 'react-bootstrap/Row'

export function Games({ games }: { games: TGame[] }) {
	// const { data: playersPicked } = useGetPlayersPicked()
	// const { data: teamRecords } = useGetTeamRecords()

	return (
		<Row xs={1} className='g-2'>
			{games.map((game) => (
				<Game
					key={game.id}
					game={game}
					// playersPicked={playersPicked?.filter(
					// 	(player) =>
					// 		player.teamAbbrev === game.awayTeam.abbrev ||
					// 		player.teamAbbrev === game.homeTeam.abbrev
					// )}
					// teamRecordsAway={teamRecords?.find(
					// 	(team) => team.teamAbbrev.default === game.awayTeam.abbrev
					// )}
					// teamRecordsHome={teamRecords?.find(
					// 	(team) => team.teamAbbrev.default === game.homeTeam.abbrev
					// )}
				/>
			))}
		</Row>
	)
}
