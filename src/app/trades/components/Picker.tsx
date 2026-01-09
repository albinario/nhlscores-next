import { useCallback, useMemo } from 'react'

import Col from 'react-bootstrap/Col'

import { Logo } from '@/components/Logo'

import { positionOrder } from '@/app/lib/globals'
import { patchPlayer } from '@/services/playersApi'
import type { TPlayer } from '@/types'

import { Missing } from './Missing'

type TPicker = {
	picker: string
	playersPicked?: TPlayer[]
}

export const Picker = ({ picker, playersPicked = [] }: TPicker) => {
	const sortedPlayers = useMemo(() => {
		if (!playersPicked.length) return []

		return [...playersPicked].sort((a, b) => {
			const aPosIndex = positionOrder.indexOf(a.pos as any)
			const bPosIndex = positionOrder.indexOf(b.pos as any)
			const posDiff = aPosIndex - bPosIndex
			if (posDiff !== 0) return posDiff

			return a.jersey - b.jersey
		})
	}, [playersPicked])

	const removePicker = useCallback(async (id: number) => {
		try {
			await patchPlayer({ id })
		} catch (error) {
			console.error('Failed to remove player:', error)
			alert(error instanceof Error ? error.message : 'Something went wrong')
		}
	}, [])

	return (
		<Col>
			<h3>{picker}</h3>

			{sortedPlayers.map((player) => (
				<div key={player.id} className='mb-1'>
					<button
						className='btn btn-sm p-0 border-0'
						onClick={() => removePicker(player.id)}
						type='button'
					>
						<Logo teamAbbrev={player.teamAbbrev} />
					</button>

					<span className='mx-1 small'>
						{player.pos} {player.jersey}
					</span>

					{player.name}
				</div>
			))}

			<Missing playersPicked={playersPicked} />
		</Col>
	)
}
