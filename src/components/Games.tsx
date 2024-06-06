import { Game } from '@/components/Game'
import useFetchData from '@/hooks/useFetchData'
import Row from 'react-bootstrap/Row'

export function Games({ games }: { games: TGame[] }) {
	const { data: playersPicked } = useFetchData<TPlayer[]>('playersPicked')
	const { data: teamRecords } = useFetchData<TTeamRecord[]>('teamRecords')

	return (
		<Row xs={1} className='g-2'>
			{games.map((game) => (
				<Game
					key={game.id}
					game={game}
					playersPicked={playersPicked?.filter(
						(player) =>
							player.teamAbbrev === game.awayTeam.abbrev ||
							player.teamAbbrev === game.homeTeam.abbrev
					)}
					teamRecordAway={teamRecords?.find(
						(team) => team.teamAbbrev.default === game.awayTeam.abbrev
					)}
					teamRecordHome={teamRecords?.find(
						(team) => team.teamAbbrev.default === game.homeTeam.abbrev
					)}
				/>
			))}
		</Row>
	)
}
