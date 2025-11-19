import { Fragment, useMemo } from 'react'
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

const useWeekGames = (games: TGame[], startDate: string, endDate: string) => {
	return useMemo(
		() =>
			games.filter(
				(game) => game.gameDate >= startDate && game.gameDate <= endDate
			),
		[games, startDate, endDate]
	)
}

const usePickerPlayers = (
	players: TPlayer[],
	pickerCode: string,
	exclude = false
) => {
	return useMemo(
		() =>
			players.filter((player) =>
				exclude
					? player.picker.toLowerCase() !== pickerCode
					: player.picker.toLowerCase() === pickerCode
			),
		[players, pickerCode, exclude]
	)
}

type TTeamRow = {
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
}: TTeamRow) => {
	const { data: games } = useFetchData<TGame[]>(
		EPath.schedule + teamRecord.teamAbbrev.default
	)

	const week1Games = useWeekGames(games || [], dates.week1Start, dates.week1End)
	const week2Games = useWeekGames(games || [], dates.week2Start, dates.week2End)
	const week3Games = useWeekGames(games || [], dates.week3Start, dates.week3End)
	const week4Games = useWeekGames(games || [], dates.week4Start, dates.week4End)

	const primaryPickerPlayers = usePickerPlayers(
		playersPicked || [],
		pickers[0].code
	)
	const otherPickerPlayers = usePickerPlayers(
		playersPicked || [],
		pickers[0].code,
		true
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
				games={week1Games}
				endDate={dates.week1End}
				startDate={dates.week1Start}
				teamAbbrev={teamRecord.teamAbbrev.default}
				teams={teams}
			/>

			<td className='text-end'>
				<Pickers players={primaryPickerPlayers} showPickerNames />
			</td>

			<td className='text-center'>
				<Logo teamAbbrev={teamRecord.teamAbbrev.default} />
			</td>

			<td>
				<Pickers players={otherPickerPlayers} />
			</td>

			<Week
				games={week2Games}
				endDate={dates.week2End}
				startDate={dates.week2Start}
				teamAbbrev={teamRecord.teamAbbrev.default}
				teams={teams}
			/>

			<Week
				games={week3Games}
				endDate={dates.week3End}
				startDate={dates.week3Start}
				teamAbbrev={teamRecord.teamAbbrev.default}
				teams={teams}
			/>

			<Week
				games={week4Games}
				endDate={dates.week4End}
				startDate={dates.week4Start}
				teamAbbrev={teamRecord.teamAbbrev.default}
				teams={teams}
			/>

			<td>{(teamRecord.pointPctg * 100).toFixed()}%</td>

			<td>
				{teamRecord.wins}-{teamRecord.losses}-{teamRecord.otLosses}
			</td>

			<td>
				{teamRecord.goalFor}-{teamRecord.goalAgainst}
			</td>

			<td className='text-center'>
				<Logo teamAbbrev={teamRecord.teamAbbrev.default} />
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
