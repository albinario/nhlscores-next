import { Missing } from './Missing'
import Col from 'react-bootstrap/Col'
import { Logo } from '@/components/Logo'
import { EPosition } from '@/enums'
import { patchPlayer } from '@/services/playersApi'
import type { TPlayer } from '@/types'

type TCPicker = {
	picker: string
	playersPicked?: TPlayer[]
}

export const Picker = ({ picker, playersPicked }: TCPicker) => {
	const order = [EPosition.C, EPosition.W, EPosition.D, EPosition.G]

	const removePicker = async (id: number) => {
		try {
			patchPlayer({ id })
		} catch (error) {
			return alert(error || 'Something went wrong')
		}
	}

	return (
		<Col>
			<h3>{picker}</h3>

			{playersPicked
				?.sort((a, b) => a.jersey - b.jersey)
				.sort((a, b) => order.indexOf(a.pos) - order.indexOf(b.pos))
				.map((player) => (
					<div key={player.id} className='mb-1'>
						<span
							className='cursor-pointer'
							onClick={() => removePicker(player.id)}
							role='button'
						>
							<Logo teamAbbrev={player.teamAbbrev} />
						</span>

						<span className='mx-1 small'>
							{player.pos} {player.jersey}
						</span>

						{player.name}
					</div>
				))}

			{playersPicked && <Missing playersPicked={playersPicked} />}
		</Col>
	)
}
