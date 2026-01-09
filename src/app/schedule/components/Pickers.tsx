import { Fragment, useMemo } from 'react'

import type { TPlayer } from '@/types'

type TPickers = {
	players: TPlayer[]
	showPicker?: boolean
}

export const Pickers = ({ players, showPicker = false }: TPickers) => {
	const sortedPlayers = useMemo(
		() => players.sort((a, b) => a.jersey - b.jersey),
		[players],
	)

	return sortedPlayers.length > 0 ? (
		<Fragment>
			{sortedPlayers
				.map(
					(player) =>
						`${showPicker ? (player.picker || '').toUpperCase() : ''}${
							player.jersey
						}`,
				)
				.join(', ')}
		</Fragment>
	) : null
}
