import { useCallback, useMemo, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { SubmitHandler, useForm } from 'react-hook-form'

import { pickers } from '@/app/lib/globals'
import { EPosition } from '@/enums'
import { postPlayer } from '@/services/playersApi'
import { searchPlayers } from '@/services/searchAPI'
import type { TPlayer, TPlayerSearch } from '@/types'

enum EForm {
	id = 'id',
	picker = 'picker',
}

type TPlayerAddForm = {
	players?: TPlayer[]
}

type TPlayerToAdd = {
	id: string
	picker: string
}

const DEFAULT_PLAYER_OPTION_VALUE = '0'
const EMPTY_PICKER_VALUE = ''

export const PlayerAddForm = ({ players = [] }: TPlayerAddForm) => {
	const [playersSearch, setPlayersSearch] = useState<TPlayerSearch[] | null>(
		null,
	)
	const [searchInput, setSearchInput] = useState('')
	const [isSearching, setIsSearching] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const { formState, handleSubmit, register, reset } = useForm<TPlayerToAdd>()

	const search = useCallback(async () => {
		if (!searchInput.trim()) return

		setIsSearching(true)
		try {
			const searchResults = await searchPlayers(searchInput)
			const filteredPlayers = searchResults.filter(
				(player) => player.sweaterNumber,
			)
			setPlayersSearch(filteredPlayers)
		} catch (error) {
			console.error('Search failed:', error)
			setPlayersSearch([])
		} finally {
			setIsSearching(false)
		}
	}, [searchInput])

	const addPlayer: SubmitHandler<TPlayerToAdd> = useCallback(
		async (playerToAdd: TPlayerToAdd) => {
			setIsSubmitting(true)

			try {
				const existingPlayer = players.find(
					(player) => player.id === Number(playerToAdd.id),
				)
				if (existingPlayer) {
					alert('Player already exists in the system')
					return
				}

				const player = playersSearch?.find(
					(player) => player.playerId === playerToAdd.id,
				)

				if (!player) {
					alert('Player not found in search results')
					return
				}

				const pos =
					player.positionCode === EPosition.L ||
					player.positionCode === EPosition.R
						? EPosition.W
						: player.positionCode

				const playerToPost: TPlayer = {
					id: Number(playerToAdd.id),
					name: player.name,
					jersey: player.sweaterNumber,
					pos,
					teamAbbrev: player.teamAbbrev,
					picker: playerToAdd.picker,
				}

				await postPlayer(playerToPost)

				setPlayersSearch(null)
				setSearchInput('')
				reset()
			} catch (error) {
				console.error('Failed to add player:', error)
				alert(error instanceof Error ? error.message : 'Something went wrong')
			} finally {
				setIsSubmitting(false)
			}
		},
		[players, playersSearch, reset],
	)

	const playerOptions = useMemo(() => {
		if (!playersSearch) return []

		return playersSearch.map((player) => ({
			value: player.playerId,
			label: player.name,
		}))
	}, [playersSearch])

	const pickerOptions = useMemo(() => {
		return pickers.map((picker) => ({
			value: picker.code,
			label: picker.name,
		}))
	}, [])

	const isFormDisabled = isSubmitting || isSearching
	const canSearch = searchInput.trim().length > 0 && !isSearching

	return (
		<Form onSubmit={handleSubmit(addPlayer)}>
			<Row className='g-1'>
				<Col>
					<Form.Control
						disabled={isFormDisabled}
						id='search-new-players-input'
						onChange={(e) => setSearchInput(e.target.value)}
						placeholder='Search players...'
						type='text'
						value={searchInput}
					/>
				</Col>

				<Col>
					<Button
						className='form-control'
						disabled={!canSearch}
						onClick={search}
						type='button'
						variant='outline-success'
					>
						{isSearching ? '⏳' : '🔎'}
					</Button>
				</Col>

				<Col>
					<Form.Select
						{...register(EForm.id, { required: true, min: 1 })}
						disabled={isFormDisabled}
					>
						<option value={DEFAULT_PLAYER_OPTION_VALUE}>Select Player</option>
						{playerOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Select {...register(EForm.picker)} disabled={isFormDisabled}>
						<option value={EMPTY_PICKER_VALUE}>Select Picker</option>
						{pickerOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</Form.Select>
				</Col>

				<Col>
					<Button
						className='form-control'
						disabled={!formState.isValid || isFormDisabled}
						type='submit'
						variant='outline-success'
					>
						{isSubmitting ? '⏳' : '+'}
					</Button>
				</Col>
			</Row>
		</Form>
	)
}
