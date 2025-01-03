import { Fragment } from 'react'
import { pickers } from '@/app/lib/globals'
import { Logo } from '@/components/Logo'
import { Pickers } from './Pickers'
import { Week } from './Week'
import { EPath } from '@/enums'
import { useFetchData } from '@/hooks/useFetchData'
import type {
	TDates,
	TGame,
	TPlayer,
	TTeamRecord,
	TTeamSchedule,
} from '@/types'

type TCTeamRow = {
	dates: TDates
	playersPicked?: TPlayer[]
	teamRecord: TTeamRecord
	teams?: TTeamSchedule[]
}

export const TeamRow = ({
	dates,
	playersPicked,
	teamRecord,
	teams,
}: TCTeamRow) => {
	const { data: games } = useFetchData<TGame[]>(
		EPath.schedule + teamRecord.teamAbbrev.default
	)

	return games ? (
		<tr>
			<td>{teamRecord.leagueSequence}</td>
			<td>{teamRecord.leagueL10Sequence}</td>

			<td className='text-center'>
				<Logo teamAbbrev={teamRecord.teamAbbrev.default} />
			</td>

			<td>{teamRecord.placeName.default}</td>

			<td>
				{teamRecord.streakCode}
				{teamRecord.streakCount}
			</td>

			<td>
				{teamRecord.l10Wins}-{teamRecord.l10Losses}-{teamRecord.l10OtLosses}
			</td>

			<td>
				{teamRecord.l10GoalsFor}-{teamRecord.l10GoalsAgainst}
			</td>

			<Week
				games={games.filter(
					(game) =>
						game.gameDate >= dates.week1Start && game.gameDate <= dates.week1End
				)}
				endDate={dates.week1End}
				startDate={dates.week1Start}
				teamAbbrev={teamRecord.teamAbbrev.default}
				teams={teams}
			/>

			<Week
				games={games.filter(
					(game) =>
						game.gameDate >= dates.week2Start && game.gameDate <= dates.week2End
				)}
				endDate={dates.week2End}
				startDate={dates.week2Start}
				teamAbbrev={teamRecord.teamAbbrev.default}
				teams={teams}
			/>

			<Week
				games={games.filter(
					(game) =>
						game.gameDate >= dates.week3Start && game.gameDate <= dates.week3End
				)}
				endDate={dates.week3End}
				startDate={dates.week3Start}
				teamAbbrev={teamRecord.teamAbbrev.default}
				teams={teams}
			/>

			<Week
				games={games.filter(
					(game) =>
						game.gameDate >= dates.week4Start && game.gameDate <= dates.week4End
				)}
				endDate={dates.week4End}
				startDate={dates.week4Start}
				teamAbbrev={teamRecord.teamAbbrev.default}
				teams={teams}
			/>

			{playersPicked && (
				<Fragment>
					<td className='text-end'>
						<span className='ms-2'>
							<Pickers
								isA
								players={playersPicked?.filter(
									(player) => player.picker.toLowerCase() === pickers[0].code
								)}
							/>
						</span>
					</td>

					<td className='text-center'>
						<Logo teamAbbrev={teamRecord.teamAbbrev.default} />
					</td>

					<td>
						<Pickers
							players={playersPicked?.filter(
								(player) => player.picker.toLowerCase() !== pickers[0].code
							)}
						/>
					</td>
				</Fragment>
			)}

			<td>{(teamRecord.pointPctg * 100).toFixed()}%</td>

			<td>
				{teamRecord.wins}-{teamRecord.losses}-{teamRecord.otLosses}
			</td>

			<td>
				{teamRecord.goalFor}-{teamRecord.goalAgainst}
			</td>

			<td>
				<span className='home'>
					{teamRecord.homeWins}-{teamRecord.homeLosses}-
					{teamRecord.homeOtLosses}
				</span>
			</td>

			<td>
				<span className='home'>
					{teamRecord.homeGoalsFor}-{teamRecord.homeGoalsAgainst}
				</span>
			</td>

			<td>
				{teamRecord.roadWins}-{teamRecord.roadLosses}-{teamRecord.roadOtLosses}
			</td>

			<td>
				{teamRecord.roadGoalsFor}-{teamRecord.roadGoalsAgainst}
			</td>
		</tr>
	) : null
}
