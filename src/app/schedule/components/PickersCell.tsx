import classNames from 'classnames'
import type { TPlayer } from '@/types'

type TCPickersCell = {
	players: TPlayer[]
	textEnd?: boolean
}

export const PickersCell = ({ players, textEnd }: TCPickersCell) => (
	<td className={classNames({ 'text-end': textEnd })}>
		{players
			.sort((a, b) => a.jersey - b.jersey)
			.map(
				(player) =>
					(!textEnd ? player.picker.toUpperCase() : '') + player.jersey
			)
			.join(', ')}
	</td>
)
