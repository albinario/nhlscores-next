import useFetchData from '@/hooks/useFetchData'
import type { Dates, Team } from '../types'
import Logo from './Logo'
import Week from './Week'
import Alert from 'react-bootstrap/Alert'

export function TeamRow({
	dates,
	playersPicked,
	teamRecord,
	teams,
}: {
	dates: Dates
	playersPicked?: TPlayerPicked[]
	teamRecord: TTeamRecord
	teams?: Team[]
}) {
	// const { data: games, isError } = useGetGames(teamRecord.teamAbbrev.default)

	const {
		data: games,
		error,
		isLoading,
	} = useFetchData<any>('schedule/' + teamRecord.teamAbbrev.default)

	if (error) return <Alert variant='warning'>Error fetching team</Alert>

	return games ? (
		// <tr>
		// 	<td>{teamRecord.leagueSequence}</td>
		// 	<td>{teamRecord.leagueL10Sequence}</td>
		// 	<td className='text-center'>
		// 		<Logo teamAbbrev={teamRecord.teamAbbrev.default} />
		// 	</td>
		// 	<td>{teamRecord.teamName.default}</td>
		// 	<td>
		// 		{teamRecord.l10Wins}-{teamRecord.l10Losses}-{teamRecord.l10OtLosses}
		// 	</td>
		// 	<td>
		// 		{teamRecord.l10GoalsFor}-{teamRecord.l10GoalsAgainst}
		// 	</td>
		// 	<td>
		// 		{teamRecord.streakCode}
		// 		{teamRecord.streakCount}
		// 	</td>
		// 	<td>
		// 		{teamRecord.wins}-{teamRecord.losses}-{teamRecord.otLosses}
		// 	</td>
		// 	<td>
		// 		{teamRecord.goalFor}-{teamRecord.goalAgainst}
		// 	</td>
		// 	<td>
		// 		<span className='home'>
		// 			{teamRecord.homeWins}-{teamRecord.homeLosses}-
		// 			{teamRecord.homeOtLosses}
		// 		</span>
		// 	</td>
		// 	<td>
		// 		<span className='home'>
		// 			{teamRecord.homeGoalsFor}-{teamRecord.homeGoalsAgainst}
		// 		</span>
		// 	</td>
		// 	<td>
		// 		{teamRecord.roadWins}-{teamRecord.roadLosses}-{teamRecord.roadOtLosses}
		// 	</td>
		// 	<td>
		// 		{teamRecord.roadGoalsFor}-{teamRecord.roadGoalsAgainst}
		// 	</td>

		// 	<td>{(teamRecord.pointPctg * 100).toFixed()}%</td>
		// 	<td>
		// 		<Week
		// 			games={games.filter(
		// 				(game) =>
		// 					game.gameDate >= dates.week1Start &&
		// 					game.gameDate <= dates.week1End
		// 			)}
		// 			endDate={dates.week1End}
		// 			startDate={dates.week1Start}
		// 			teamAbbrev={teamRecord.teamAbbrev.default}
		// 			teams={teams}
		// 		/>
		// 	</td>
		// 	<td>
		// 		<Week
		// 			games={games.filter(
		// 				(game) =>
		// 					game.gameDate >= dates.week2Start &&
		// 					game.gameDate <= dates.week2End
		// 			)}
		// 			endDate={dates.week2End}
		// 			startDate={dates.week2Start}
		// 			teamAbbrev={teamRecord.teamAbbrev.default}
		// 			teams={teams}
		// 		/>
		// 	</td>
		// 	<td>
		// 		<Week
		// 			games={games.filter(
		// 				(game) =>
		// 					game.gameDate >= dates.week3Start &&
		// 					game.gameDate <= dates.week3End
		// 			)}
		// 			endDate={dates.week3End}
		// 			startDate={dates.week3Start}
		// 			teamAbbrev={teamRecord.teamAbbrev.default}
		// 			teams={teams}
		// 		/>
		// 	</td>
		// 	<td>
		// 		<Week
		// 			games={games.filter(
		// 				(game) =>
		// 					game.gameDate >= dates.week4Start &&
		// 					game.gameDate <= dates.week4End
		// 			)}
		// 			endDate={dates.week4End}
		// 			startDate={dates.week4Start}
		// 			teamAbbrev={teamRecord.teamAbbrev.default}
		// 			teams={teams}
		// 		/>
		// 	</td>
		// 	<td className='text-end'>
		// 		{playersPicked
		// 			?.filter((player) => player.picker === 'A')
		// 			.sort((a, b) => a.jersey - b.jersey)
		// 			.map((player) => player.jersey)
		// 			.join(', ')}
		// 	</td>
		// 	<td className='text-center'>
		// 		<Logo teamAbbrev={teamRecord.teamAbbrev.default} />
		// 	</td>
		// 	<td>
		// 		{playersPicked
		// 			?.filter((player) => player.picker !== 'A')
		// 			.sort((a, b) => a.jersey - b.jersey)
		// 			.map((player) => `${player.picker}${player.jersey}`)
		// 			.join(', ')}
		// 	</td>
		// </tr>
		<></>
	) : (
		<></>
	)
}

export default TeamRow
