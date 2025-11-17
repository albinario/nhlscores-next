import { Logo } from './Logo'
import { getTeamName } from '@/helpers/getTeamName'
import { Fragment, useMemo } from 'react'
import Col from 'react-bootstrap/Col'
import type { TPlayer, TTeamGame, TTeamRecord } from '@/types'

type TTeam = {
	away?: boolean
	isLoading: boolean
	playersPicked: TPlayer[]
	showResults: boolean
	team: TTeamGame
	teamRecord?: TTeamRecord
}

export const Team = ({
	away,
	isLoading,
	playersPicked,
	showResults,
	team,
	teamRecord,
}: TTeam) => {
	const teamData = useMemo(() => {
		const teamName = getTeamName(team.abbrev)
		const placeName = team.placeName.default

		const sortedPlayers = [...playersPicked].sort((a, b) => a.jersey - b.jersey)

		const recordDisplay = teamRecord
			? `${teamRecord.wins}-${teamRecord.losses}-${teamRecord.otLosses}`
			: ''

		const streakDisplay = teamRecord
			? `${teamRecord.streakCode}${teamRecord.streakCount}`
			: ''

		return {
			placeName,
			recordDisplay,
			sortedPlayers,
			streakDisplay,
			teamName,
		}
	}, [playersPicked, team.abbrev, team.placeName.default, teamRecord])

	const layoutClasses = useMemo(
		() => ({
			container: `d-flex flex-column ${away && 'align-items-end'}`,
			header: `d-flex mb-1 ${
				away ? 'me-3' : 'flex-row-reverse justify-content-end ms-3'
			}`,
			logo: away ? 'ms-1' : 'me-1',
			playerContainer: away ? 'text-end' : '',
		}),
		[away]
	)

	const showPlayers = !showResults || isLoading
	const showRecord = showResults && teamRecord && !isLoading

	return (
		<Col className={layoutClasses.container}>
			<div className={layoutClasses.header}>
				<div>
					<span className='d-none d-sm-inline me-1'>{teamData.placeName}</span>
					{teamData.teamName}
				</div>

				<Logo className={layoutClasses.logo} teamAbbrev={team.abbrev} />
			</div>

			{showPlayers && (
				<Fragment>
					{teamData.sortedPlayers.map((player) => (
						<div className={layoutClasses.playerContainer} key={player.id}>
							<div className={player.picker}>
								<span className='small'>{player.jersey} </span>
								<span className='d-none d-sm-inline'>{player.name}</span>
								<span className='d-sm-none'>{player.name.split(' ')[1]}</span>

								<span className='small'>
									{' '}
									{player.pos} {player.picker.toUpperCase()}
								</span>
							</div>
						</div>
					))}
				</Fragment>
			)}

			{showRecord && (
				<span className=' mx-3 small'>
					{teamData.recordDisplay} {teamData.streakDisplay}
				</span>
			)}
		</Col>
	)
}
