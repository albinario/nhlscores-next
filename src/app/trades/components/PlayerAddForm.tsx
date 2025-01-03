import { EPosition } from '@/enums'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { playerPost } from '@/services/playersApi'
import { searchPlayers } from '@/services/searchAPI'
import type { TPlayer, TPlayerSearch, TPlayerToAdd } from '@/types'

type TCPlayerAddForm = {
	players?: TPlayer[]
}

export const PlayerAddForm = ({ players }: TCPlayerAddForm) => {
	const [playersSearch, setPlayersSearch] = useState<TPlayerSearch[] | null>(
		null
	)

	const [searchInput, setSearchInput] = useState('')

	const { formState, handleSubmit, register, reset } = useForm<TPlayerToAdd>()

	const search = async () => {
		const players = await searchPlayers(searchInput)
		setPlayersSearch(players.filter((player) => player.sweaterNumber))
	}

	const addPlayer: SubmitHandler<TPlayerToAdd> = async (
		playerToAdd: TPlayerToAdd
	) => {
		if (players?.find((player) => player.id === Number(playerToAdd.id)))
			return alert('Player already added')

		try {
			const playerInNhlApi = playersSearch?.find(
				(player) => player.playerId == playerToAdd.id
			)

			if (playerInNhlApi) {
				const playerToPost: TPlayer = {
					id: Number(playerToAdd.id),
					name: playerInNhlApi.name,
					jersey: playerInNhlApi.sweaterNumber,
					pos:
						playerInNhlApi.positionCode === EPosition.L ||
						playerInNhlApi.positionCode === EPosition.R
							? EPosition.W
							: playerInNhlApi.positionCode,
					teamAbbrev: playerInNhlApi.teamAbbrev,
					picker: playerToAdd.picker,
				}

				playerPost(playerToPost)
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
