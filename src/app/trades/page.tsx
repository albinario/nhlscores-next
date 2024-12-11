'use client'
import { pickers } from '@/app/lib/globals'
import { Missing } from './components/Missing'
import { Picker } from './components/Picker'
import { PlayerAddForm } from './components/PlayerAddForm'
import { PlayerEditForm } from './components/PlayerEditForm'
import { EQueryKey } from '@/enums'
import { useFetchData } from '@/hooks/useFetchData'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import type { TPlayer } from '@/types'

export default function Trades() {
	const { data: players } = useFetchData<TPlayer[]>(EQueryKey.players)

	const { data: playersPicked } = useFetchData<TPlayer[]>(
		EQueryKey.playersPicked
	)

	return (
		<Container className='d-flex flex-column gap-3 mt-3' fluid>
			<PlayerAddForm players={players} />

			<PlayerEditForm players={players} />

			<Row>
				{pickers.map((picker, index) => (
					<Picker
						key={index}
						picker={picker.name}
						playersPicked={playersPicked?.filter(
							(player) => player.picker.toLowerCase() === picker.code
						)}
					/>
				))}

				{playersPicked && playersPicked.length < 48 && (
					<Missing isAll playersPicked={playersPicked} />
				)}
			</Row>
		</Container>
	)
}
