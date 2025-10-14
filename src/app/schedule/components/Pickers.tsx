import { Fragment, useMemo } from 'react'
import type { TPlayer } from '@/types'

type TPickers = {
	players: TPlayer[]
	showPickerNames?: boolean
}

export const Pickers = ({ players, showPickerNames = false }: TPickers) => {
	const sortedPlayers = useMemo(
		() => players.sort((a, b) => a.jersey - b.jersey),
		[players]
	)

	return sortedPlayers.length > 0 ? (
		<Fragment>
			{sortedPlayers
				.map(
					(player) =>
						`${showPickerNames ? (player.picker || '').toUpperCase() : ''}${
							player.jersey
						}`
				)
				.join(', ')}
		</Fragment>
	) : null
}
