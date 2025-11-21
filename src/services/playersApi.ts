import { mutate } from 'swr'

import { EPath } from '@/enums'
import type { TPlayer } from '@/types'

export const patchPlayer = async (playerToPatch: Partial<TPlayer>) => {
	await fetch(EPath.api + EPath.players, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(playerToPatch),
	})

	await mutate(EPath.playersPicked)
}

export const postPlayer = async (playerToPost: TPlayer) => {
	await fetch(EPath.api + EPath.players, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(playerToPost),
	})

	await mutate(EPath.players)
	await mutate(EPath.playersPicked)
}
