import { Missing } from './Missing'
import Col from 'react-bootstrap/Col'
import { Logo } from '@/components/Logo'
import { EQueryKey } from '@/enums'
import { mutate } from 'swr'
import type { TPlayer } from '@/types'

export function Picker({
	picker,
	playersPicked,
}: {
	picker: string
	playersPicked?: TPlayer[]
}) {
	const order = ['C', 'W', 'D', 'G']

	const removePicker = async (id: number) => {
		try {
			await fetch('/api/players/', {
				method: 'PATCH',
				body: JSON.stringify({ id }),
			})
		} catch (error) {
			return alert(error || 'Something went wrong')
		}
		await mutate(EQueryKey.playersPicked)
	}

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
							onClick={() => removePicker(player.id)}
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
				<Missing isAll={false} playersPicked={playersPicked} />
			)}
		</Col>
	)
}
