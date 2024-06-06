'use client'
import { Missing } from './components/Missing'
import { Picker } from './components/Picker'
import { PlayerAddForm } from './components/PlayerAddForm'
import { PlayerEditForm } from './components/PlayerEditForm'
import useFetchData from '@/hooks/useFetchData'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export default function Trades() {
	const { data: players } = useFetchData<TPlayer[]>('players')
	const { data: playersPicked } = useFetchData<TPlayer[]>('players/picked')

	return (
		<Container className='d-flex flex-column gap-3 mt-3' fluid>
			<PlayerAddForm players={players} />

			<PlayerEditForm players={players} />

			<Row>
				<Picker
					picker='Albin'
					playersPicked={playersPicked?.filter(
						(player) => player.picker === 'A'
					)}
				/>
				<Picker
					picker='Jakob'
					playersPicked={playersPicked?.filter(
						(player) => player.picker === 'J'
					)}
				/>
				<Picker
					picker='Sacke'
					playersPicked={playersPicked?.filter(
						(player) => player.picker === 'S'
					)}
				/>
				<Picker
					picker='Ville'
					playersPicked={playersPicked?.filter(
						(player) => player.picker === 'V'
					)}
				/>

				{playersPicked && playersPicked.length < 48 && (
					<Missing isAll={true} playersPicked={playersPicked} />
				)}
			</Row>
		</Container>
	)
}
