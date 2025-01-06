import { EPosition } from '@/enums'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { postPlayer } from '@/services/playersApi'
import { searchPlayers } from '@/services/searchAPI'
import type { TPlayer, TPlayerSearch } from '@/types'

enum EForm {
	id = 'id',
	picker = 'picker',
}

type TCPlayerAddForm = {
	players?: TPlayer[]
}

type TPlayerToAdd = {
	id: string
	picker: string
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
			return alert('Player already in mongo')

		try {
			const player = playersSearch?.find(
				(player) => player.playerId == playerToAdd.id
			)

			if (player) {
				const playerToPost: TPlayer = {
					id: Number(playerToAdd.id),
					name: player.name,
					jersey: player.sweaterNumber,
					pos:
						player.positionCode === EPosition.L ||
						player.positionCode === EPosition.R
							? EPosition.W
							: player.positionCode,
					teamAbbrev: player.teamAbbrev,
					picker: playerToAdd.picker,
				}

				postPlayer(playerToPost)
			} else {
				return alert('No player in search')
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
					<Form.Select {...register(EForm.id, { required: true, min: 1 })}>
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
						{...register(EForm.picker, { required: true })}
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
