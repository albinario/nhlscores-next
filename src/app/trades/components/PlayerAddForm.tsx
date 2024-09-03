import { useState } from 'react'
import { EQueryKey } from '@/enums'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { searchPlayers } from '@/services/searchAPI'
import { mutate } from 'swr'
import type { TPlayer, TPlayerSearch, TPlayerToAdd } from '@/types'

export function PlayerAddForm({ players }: { players?: TPlayer[] }) {
	const [playersSearch, setPlayersSearch] = useState<TPlayerSearch[] | null>(
		null
	)
	const [searchInput, setSearchInput] = useState('')

	const { formState, handleSubmit, register, reset } = useForm<TPlayerToAdd>()

	const search = async () => {
		const players = await searchPlayers(searchInput)
		setPlayersSearch(players.filter((player) => player.sweaterNumber))
	}

	const addPlayer: SubmitHandler<TPlayerToAdd> = async (data: TPlayerToAdd) => {
		if (players?.find((player) => player.id === Number(data.id)))
			return alert('Player already added')

		try {
			const player = playersSearch?.find((player) => player.playerId == data.id)

			if (player) {
				const playerToAdd: TPlayer = {
					id: Number(data.id),
					name: player.name,
					jersey: player.sweaterNumber,
					pos:
						player.positionCode === 'L' || player.positionCode === 'R'
							? 'W'
							: player.positionCode,
					teamAbbrev: player.teamAbbrev,
					picker: data.picker,
				}

				await fetch('/api/players', {
					method: 'POST',
					body: JSON.stringify(playerToAdd),
				})

				await mutate(EQueryKey.playersPicked)
			} else {
				alert('no player')
			}
		} catch (error) {
			return alert(error || 'Something went wrong')
		} finally {
			setPlayersSearch(null)
			setSearchInput('')
			reset()
		}
	}

	return (
		<Form onSubmit={handleSubmit(addPlayer)}>
			<Row className='g-1'>
				<Col>
					<Form.Control
						onChange={(e) => setSearchInput(e.target.value)}
						placeholder='Search'
						type='text'
						value={searchInput}
					/>
				</Col>

				<Col>
					<Button
						className='form-control'
						disabled={!searchInput}
						onClick={search}
						type='button'
						variant='outline-success'
					>
						🔎
					</Button>
				</Col>

				<Col>
					<Form.Select {...register('id', { required: true, min: 1 })}>
						<option value={0}>Player</option>
						{playersSearch?.map((player) => (
							<option key={player.playerId} value={player.playerId}>
								{player.name}
							</option>
						))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Control
						{...register('picker', { required: true })}
						placeholder='Picker'
						type='text'
					/>
				</Col>

				<Col>
					<Button
						className='form-control'
						disabled={!formState.isValid || formState.isSubmitting}
						type='submit'
						variant='outline-success'
					>
						+
					</Button>
				</Col>
			</Row>
		</Form>
	)
}
