import { useMemo } from 'react'

import { useFetchData } from '@/hooks/useFetchData'

import { pickers } from '@/app/lib/globals'
import { EPath } from '@/enums'
import type { TPlayer } from '@/types'

const usePlayersByPicker = (playersPicked: TPlayer[] | undefined) =>
	useMemo(() => {
		if (!playersPicked) return new Map<string, TPlayer[]>()

		const map = new Map<string, TPlayer[]>()

		pickers.forEach((picker) => {
			const pickerPlayers = playersPicked.filter(
				(player) => player.picker.toLowerCase() === picker.code,
			)
			map.set(picker.code, pickerPlayers)
		})

		return map
	}, [playersPicked])

export const useTrades = () => {
	const { data: players } = useFetchData<TPlayer[]>(EPath.players)
	const { data: playersPicked } = useFetchData<TPlayer[]>(EPath.playersPicked)

	const playersByPicker = usePlayersByPicker(playersPicked)

	return {
		players,
		playersByPicker,
		playersPicked,
	}
}
