'use client'
import { pickers } from '@/app/lib/globals'
import { Missing } from './components/Missing'
import { Picker } from './components/Picker'
import { PlayerAddForm } from './components/PlayerAddForm'
import { PlayerEditForm } from './components/PlayerEditForm'
import { EPath } from '@/enums'
import { useFetchData } from '@/hooks/useFetchData'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import type { TPlayer } from '@/types'

export default function Trades() {
	const { data: players } = useFetchData<TPlayer[]>(EPath.players)

	const { data: playersPicked } = useFetchData<TPlayer[]>(EPath.playersPicked)

	return (
		<Container className='d-flex flex-column gap-3 mt-3' fluid>
			<PlayerAddForm players={players} />

			<PlayerEditForm players={players} />

			<Row xs={2} md={4}>
				{pickers.map((picker) => (
					<Picker
						key={picker.code}
						picker={picker.name}
						playersPicked={playersPicked?.filter(
							(player) => player.picker.toLowerCase() === picker.code
						)}
					/>
				))}

				{playersPicked && <Missing isAll playersPicked={playersPicked} />}
			</Row>
		</Container>
	)
}
