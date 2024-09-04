import { Logo } from './Logo'
import { getTeamName } from '@/helpers/getTeamName'
import Col from 'react-bootstrap/Col'
import type { TGameTeam, TPlayer, TTeamRecord } from '@/types'

export function Team({
	away,
	playersPicked,
	showResults,
	team,
	teamRecord,
}: {
	away: boolean
	playersPicked?: TPlayer[]
	showResults: boolean
	team: TGameTeam
	teamRecord?: TTeamRecord
}) {
	return (
		<Col className={`d-flex flex-column ${away && 'align-items-end'}`}>
			<div
				className={`d-flex mb-1 ${
					away ? 'me-3' : 'flex-row-reverse justify-content-end ms-3'
				}`}
			>
				<div>
					<span className='d-none d-sm-inline me-1'>
						{team.placeName.default}
					</span>
					{getTeamName(team.abbrev)}
				</div>

				<Logo className={away ? 'ms-1' : 'me-1'} teamAbbrev={team.abbrev} />
			</div>

			{!showResults &&
				playersPicked
					?.sort((a, b) => a.jersey - b.jersey)
					.map((player) => (
						<div className={away ? 'text-end' : ''} key={player.id}>
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

			{showResults && teamRecord && (
				<span className='small'>
					{teamRecord.wins}-{teamRecord.losses}-{teamRecord.otLosses}
					<span className='text-muted ms-1'>
						{teamRecord.streakCode}
						{teamRecord.streakCount}
					</span>
				</span>
			)}
		</Col>
	)
}
