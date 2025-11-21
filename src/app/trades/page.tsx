'use client'
import { useMemo } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { useFetchData } from '@/hooks/useFetchData'

import { pickers } from '@/app/lib/globals'
import { EPath } from '@/enums'
import type { TPlayer } from '@/types'

import { Missing } from './components/Missing'
import { Picker } from './components/Picker'
import { PlayerAddForm } from './components/PlayerAddForm'
import { PlayerEditForm } from './components/PlayerEditForm'

const usePlayersByPicker = (playersPicked: TPlayer[] | undefined) => {
	return useMemo(() => {
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
}

export default function Trades() {
	const { data: players } = useFetchData<TPlayer[]>(EPath.players)
	const { data: playersPicked } = useFetchData<TPlayer[]>(EPath.playersPicked)

	const playersByPicker = usePlayersByPicker(playersPicked)

	return (
		<Container className='d-flex flex-column gap-3 mt-3' fluid>
			<PlayerAddForm players={players} />
			<PlayerEditForm players={players} />

			<Row xs={2} md={4}>
				{pickers.map((picker) => (
					<Picker
						key={picker.code}
						picker={picker.name}
						playersPicked={playersByPicker.get(picker.code)}
					/>
				))}

				{playersPicked && <Missing isAll playersPicked={playersPicked} />}
			</Row>
		</Container>
	)
}
