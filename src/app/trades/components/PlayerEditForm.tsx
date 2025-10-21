import { pickers } from '@/app/lib/globals'
import { EPath, EPosition } from '@/enums'
import { useFetchData } from '@/hooks/useFetchData'
import { useState, useCallback, useMemo } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { patchPlayer } from '@/services/playersApi'
import type { TPlayer, TTeamRecord } from '@/types'

enum EForm {
	id = 'id',
	jersey = 'jersey',
	picker = 'picker',
	pos = 'pos',
	teamAbbrev = 'teamAbbrev',
}

type TPlayerEditForm = {
	players?: TPlayer[]
}

type TPlayerToEdit = Omit<TPlayer, 'name'>

const DEFAULT_PLAYER_VALUE = 0
const EMPTY_STRING_VALUE = ''
const VALID_POSITIONS = Object.values(EPosition).filter(
	(pos) => pos !== EPosition.L && pos !== EPosition.R
)

export const PlayerEditForm = ({ players = [] }: TPlayerEditForm) => {
	const [searchInput, setSearchInput] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const { formState, handleSubmit, register, reset } = useForm<TPlayerToEdit>()

	const editPlayer: SubmitHandler<TPlayerToEdit> = useCallback(
		async (playerToEdit: TPlayerToEdit) => {
			setIsSubmitting(true)

			try {
				await patchPlayer(playerToEdit)
				setSearchInput('')
				reset()
			} catch (error) {
				console.error('Failed to edit player:', error)
				alert(error instanceof Error ? error.message : 'Something went wrong')
			} finally {
				setIsSubmitting(false)
			}
		},
		[reset]
	)

	const { data: teamRecords } = useFetchData<TTeamRecord[]>(EPath.teamRecords)

	const filteredPlayers = useMemo(() => {
		if (!searchInput.trim()) return []

		const searchTerm = searchInput.toLowerCase()
		return players.filter((player) =>
			player.name.toLowerCase().includes(searchTerm)
		)
	}, [players, searchInput])

	const teamOptions = useMemo(() => {
		if (!teamRecords) return []

		return teamRecords
			.map((teamRecord) => ({
				value: teamRecord.teamAbbrev.default,
				label: teamRecord.teamName.default,
			}))
			.sort((a, b) => a.label.localeCompare(b.label))
	}, [teamRecords])

	const pickerOptions = useMemo(() => {
		return pickers.map((picker) => ({
			value: picker.code,
			label: picker.name,
		}))
	}, [])

	const positionOptions = useMemo(() => {
		return VALID_POSITIONS.map((pos) => ({
			value: pos,
			label: pos,
		}))
	}, [])

	const isFormDisabled = isSubmitting

	return (
		<Form onSubmit={handleSubmit(editPlayer)}>
			<Row className='g-1'>
				<Col>
					<Form.Control
						disabled={isFormDisabled}
						onChange={(e) => setSearchInput(e.target.value)}
						placeholder='Search players...'
						type='text'
						value={searchInput}
					/>
				</Col>

				<Col>
					<Form.Select
						{...register(EForm.id, { required: true, min: 1 })}
						disabled={isFormDisabled}
					>
						<option value={DEFAULT_PLAYER_VALUE}>Select Player</option>

						{filteredPlayers.map((player) => (
							<option key={player.id} value={player.id}>
								{player.name}
							</option>
						))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Select {...register(EForm.picker)} disabled={isFormDisabled}>
						<option value={EMPTY_STRING_VALUE}>Select Picker</option>

						{pickerOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Select
						{...register(EForm.teamAbbrev)}
						disabled={isFormDisabled}
					>
						<option value={EMPTY_STRING_VALUE}>Select Team</option>

						{teamOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Control
						{...register(EForm.jersey)}
						disabled={isFormDisabled}
						placeholder='Jersey Number'
						type='number'
					/>
				</Col>

				<Col>
					<Form.Select {...register(EForm.pos)} disabled={isFormDisabled}>
						<option value={EMPTY_STRING_VALUE}>Select Position</option>

						{positionOptions.map((option) => (
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
