'use client'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { useTrades } from '@/hooks/useTrades'

import { pickers } from '@/app/lib/globals'

import { Missing } from './components/Missing'
import { Picker } from './components/Picker'
import { PlayerAddForm } from './components/PlayerAddForm'
import { PlayerEditForm } from './components/PlayerEditForm'

export default function Trades() {
	const { players, playersByPicker, playersPicked } = useTrades()

	return (
		<Container className='d-flex flex-column gap-3 mt-3' fluid>
			<PlayerAddForm players={players} />
			<PlayerEditForm players={players} />

			<Row xs={2} md={4}>
				{pickers.map((picker) => (
					<Picker
						key={picker.code}
						picker={picker.name}
						playersPicked={playersByPicker.get(picker.code)}
					/>
				))}

				{playersPicked && <Missing isAll playersPicked={playersPicked} />}
			</Row>
		</Container>
	)
}
