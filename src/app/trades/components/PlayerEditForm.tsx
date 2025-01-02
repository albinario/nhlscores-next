import { useState } from 'react'
import { EQueryKey } from '@/enums'
import { useFetchData } from '@/hooks/useFetchData'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { mutate } from 'swr'
import type { TPlayer, TPlayerToEdit, TTeamRecord } from '@/types'

type TCPlayerEditForm = {
	players?: TPlayer[]
}

export const PlayerEditForm = ({ players }: TCPlayerEditForm) => {
	const [searchInput, setSearchInput] = useState('')

	const { formState, handleSubmit, register, reset } = useForm<TPlayerToEdit>()

	const editPlayer: SubmitHandler<TPlayerToEdit> = async (
		data: TPlayerToEdit
	) => {
		try {
			await fetch('/api/players/', {
				method: 'PATCH',
				body: JSON.stringify(data),
			})

			await mutate(EQueryKey.playersPicked)
		} catch (error) {
			return alert(error || 'Something went wrong')
		} finally {
			setSearchInput('')
			reset()
		}
	}

	const { data: teamRecords } = useFetchData<TTeamRecord[]>(
		EQueryKey.teamRecords
	)

	const teamValues = teamRecords?.map((teamRecord) => ({
		abbrev: teamRecord.teamAbbrev.default,
		name: teamRecord.teamName.default,
	}))

	return (
		<Form onSubmit={handleSubmit(editPlayer)}>
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
					<Form.Select {...register('id', { required: true, min: 1 })}>
						<option value={0}>Player</option>
						{searchInput &&
							players
								?.filter((player) =>
									player.name
										.toLowerCase()
										.includes(searchInput.toLocaleLowerCase())
								)
								.map((player) => (
									<option key={player.id} value={player.id}>
										{player.name}
									</option>
								))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Control
						{...register('picker')}
						placeholder='Picker'
						type='text'
					/>
				</Col>

				<Col>
					<Form.Select {...register('teamAbbrev')}>
						<option value={''}>Team</option>
						{teamValues
							?.sort((a, b) => a.name.localeCompare(b.name))
							.map((team, i) => (
								<option key={i} value={team.abbrev}>
									{team.name}
								</option>
							))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Control
						{...register('jersey')}
						placeholder='Jersey'
						type='number'
					/>
				</Col>

				<Col>
					<Form.Control {...register('pos')} placeholder='Pos' type='text' />
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
