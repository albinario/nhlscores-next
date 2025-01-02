import { Game } from '@/components/Game'
import { EQueryKey } from '@/enums'
import { useFetchData } from '@/hooks/useFetchData'
import Row from 'react-bootstrap/Row'
import type { TGame, TPlayer, TTeamRecord } from '@/types'

type TCGames = {
	games: TGame[]
}

export const Games = ({ games }: TCGames) => {
	const { data: playersPicked } = useFetchData<TPlayer[]>(
		EQueryKey.playersPicked
	)

	const { data: teamRecords } = useFetchData<TTeamRecord[]>(
		EQueryKey.teamRecords
	)

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
