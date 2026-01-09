import { useCallback, useMemo, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { SubmitHandler, useForm } from 'react-hook-form'

import { useFetchData } from '@/hooks/useFetchData'

import { pickers, validPositions } from '@/app/lib/globals'
import { EPath, EPlayerEditForm } from '@/enums'
import { patchPlayer } from '@/services/playersApi'
import type { TPlayer, TPlayerToEdit, TTeamRecord } from '@/types'

type TPlayerEditForm = {
	players?: TPlayer[]
}

export const PlayerEditForm = ({ players = [] }: TPlayerEditForm) => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [searchInput, setSearchInput] = useState('')

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
		[reset],
	)

	const { data: teamRecords } = useFetchData<TTeamRecord[]>(EPath.teamRecords)

	const filteredPlayers = useMemo(() => {
		if (!searchInput.trim()) return []

		const searchTerm = searchInput.toLowerCase()

		return players.filter((player) =>
			player.name.toLowerCase().includes(searchTerm),
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

	const pickerOptions = useMemo(
		() =>
			pickers.map((picker) => ({
				value: picker.code,
				label: picker.name,
			})),
		[],
	)

	const positionOptions = useMemo(
		() => validPositions.map((pos) => ({ value: pos, label: pos })),
		[],
	)

	return (
		<Form onSubmit={handleSubmit(editPlayer)}>
			<Row className='g-1'>
				<Col>
					<Form.Control
						disabled={isSubmitting}
						id='search-existing-players-input'
						onChange={(e) => setSearchInput(e.target.value)}
						placeholder='Search players...'
						type='text'
						value={searchInput}
					/>
				</Col>

				<Col>
					<Form.Select
						{...register(EPlayerEditForm.id, { required: true, min: 1 })}
						disabled={isSubmitting}
					>
						<option value={0}>Select Player</option>

						{filteredPlayers.map((player) => (
							<option key={player.id} value={player.id}>
								{player.name}
							</option>
						))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Select
						{...register(EPlayerEditForm.picker)}
						disabled={isSubmitting}
					>
						<option value=''>Select Picker</option>

						{pickerOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Select
						{...register(EPlayerEditForm.teamAbbrev)}
						disabled={isSubmitting}
					>
						<option value=''>Select Team</option>

						{teamOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Control
						{...register(EPlayerEditForm.jersey)}
						disabled={isSubmitting}
						placeholder='Jersey Number'
						type='number'
					/>
				</Col>

				<Col>
					<Form.Select
						{...register(EPlayerEditForm.pos)}
						disabled={isSubmitting}
					>
						<option value=''>Select Position</option>

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
						disabled={!formState.isValid || isSubmitting}
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
