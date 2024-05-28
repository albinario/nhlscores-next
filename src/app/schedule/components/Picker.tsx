import Logo from './Logo'
import Missing from './Missing'
import { useUpdatePlayer } from '../hooks/usePlayers'
import Col from 'react-bootstrap/Col'
import type { Player } from '../types'

interface IProps {
	picker: string
	playersPicked?: Player[]
}

const Picker: React.FC<IProps> = ({ picker, playersPicked }) => {
	const updatePlayer = useUpdatePlayer()
	const order = ['C', 'W', 'D', 'G']

	return (
		<Col>
			<h3>{picker}</h3>

			{playersPicked
				?.sort((a, b) => a.jersey - b.jersey)
				.sort((a, b) => order.indexOf(a.pos) - order.indexOf(b.pos))
				.map((player) => (
					<div key={player.id} className='mb-1'>
						<a
							className='cursor-pointer'
							onClick={() => updatePlayer.mutate({ id: player.id })}
							role='button'
						>
							<Logo teamAbbrev={player.teamAbbrev} />
						</a>
						<span className='small me-1'>
							{player.pos} {player.jersey}
						</span>
						{player.name}
					</div>
				))}
			{playersPicked && playersPicked.length < 12 && (
				<Missing all={false} players={playersPicked} />
			)}
		</Col>
	)
}

export default Picker
