import { Fragment } from 'react'
import type { TPlayer } from '@/types'

type TCPickersCell = {
	isA?: boolean
	players: TPlayer[]
}

export const Pickers = ({ isA, players }: TCPickersCell) => (
	<Fragment>
		{players
			.sort((a, b) => a.jersey - b.jersey)
			.map(
				(player) => `${!isA ? player.picker.toUpperCase() : ''}${player.jersey}`
			)
			.join(', ')}
	</Fragment>
)
