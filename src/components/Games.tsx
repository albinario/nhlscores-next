import { Game } from '@/components/Game'
import { EPath } from '@/enums'
import { useFetchData } from '@/hooks/useFetchData'
import { useMemo } from 'react'
import Row from 'react-bootstrap/Row'
import type { TGame, TPlayer, TTeamRecord } from '@/types'

type TGames = {
	games: TGame[]
	playersPicked?: TPlayer[]
}

export const Games = ({ games, playersPicked }: TGames) => {
	const { data: teamRecords } = useFetchData<TTeamRecord[]>(EPath.teamRecords)

	const gamesWithData = useMemo(() => {
		if (!teamRecords) return []

		return games.map((game) => {
			const playersPickedAway = playersPicked?.filter(
				(player) => player.teamAbbrev === game.awayTeam.abbrev
			)
			const playersPickedHome = playersPicked?.filter(
				(player) => player.teamAbbrev === game.homeTeam.abbrev
			)

			const teamRecordAway = teamRecords.find(
				(team) => team.teamAbbrev.default === game.awayTeam.abbrev
			)
			const teamRecordHome = teamRecords.find(
				(team) => team.teamAbbrev.default === game.homeTeam.abbrev
			)

			return {
				game,
				playersPicked: {
					away: playersPickedAway || [],
					home: playersPickedHome || [],
				},
				teamRecordAway,
				teamRecordHome,
			}
		})
	}, [games, playersPicked, teamRecords])

	return (
		<Row xs={1} className='g-2'>
			{gamesWithData.map(
				({ game, playersPicked, teamRecordAway, teamRecordHome }) => (
					<Game
						key={game.id}
						game={game}
						playersPicked={playersPicked}
						teamRecordAway={teamRecordAway}
						teamRecordHome={teamRecordHome}
					/>
				)
			)}
		</Row>
	)
}
