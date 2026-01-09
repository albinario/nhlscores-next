import { Logo } from '@/components/Logo'

import { useTeamRow } from '@/hooks/useTeamRow'

import type { TDates, TPlayer, TTeamRecord, TTeamSchedule } from '@/types'

import { Pickers } from './Pickers'
import { Week } from './Week'

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
	const {
		games,
		otherPickerPlayers,
		primaryPickerPlayers,
		week1Games,
		week2Games,
		week3Games,
		week4Games,
	} = useTeamRow(dates, playersPicked, teamRecord)

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
				<Pickers players={primaryPickerPlayers} />
			</td>

			<td className='text-center'>
				<Logo teamAbbrev={teamRecord.teamAbbrev.default} />
			</td>

			<td>
				<Pickers players={otherPickerPlayers} showPicker />
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
