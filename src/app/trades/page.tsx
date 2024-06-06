'use client'
import { Missing } from './components/Missing'
import { Picker } from './components/Picker'
import { PlayerAddForm } from './components/PlayerAddForm'
import { PlayerEditForm } from './components/PlayerEditForm'
import useFetchData from '@/hooks/useFetchData'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

export default function Trades() {
	const { data: players, error } = useFetchData<TPlayer[]>('players')

	return (
		<Container className='d-flex flex-column gap-3 mt-3' fluid>
			<PlayerAddForm players={players} />

			<PlayerEditForm players={players} />

			<Row>
				<Picker
					picker='Albin'
					playersPicked={players?.filter((player) => player.picker === 'A')}
				/>
				<Picker
					picker='Jakob'
					playersPicked={players?.filter((player) => player.picker === 'J')}
				/>
				<Picker
					picker='Sacke'
					playersPicked={players?.filter((player) => player.picker === 'S')}
				/>
				<Picker
					picker='Ville'
					playersPicked={players?.filter((player) => player.picker === 'V')}
				/>

				{players && players.length < 48 && (
					<Missing all={true} players={players} />
				)}
			</Row>
		</Container>
	)
}
