import { EPath } from '@/enums'
import { mutate } from 'swr'
import type { TPlayer } from '@/types'

export const playerPatch = async (playerToPatch: Partial<TPlayer>) => {
	await fetch(EPath.api + EPath.players, {
		method: 'PATCH',
		body: JSON.stringify(playerToPatch),
	})

	await mutate(EPath.playersPicked)
}

export const playerPost = async (playerToPost: TPlayer) => {
	await fetch(EPath.api + EPath.players, {
		method: 'POST',
		body: JSON.stringify(playerToPost),
	})

	await mutate(EPath.playersPicked)
}
