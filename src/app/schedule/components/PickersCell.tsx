import classNames from 'classnames'
import type { TPlayer } from '@/types'

type TPickersCellComponent = {
	players: TPlayer[]
	textEnd?: boolean
}

export function PickersCell({ players, textEnd }: TPickersCellComponent) {
	return (
		<td className={classNames({ 'text-end': textEnd })}>
			{players
				.sort((a, b) => a.jersey - b.jersey)
				.map((player) => player.picker.toUpperCase() + player.jersey)
				.join(', ')}
		</td>
	)
}
