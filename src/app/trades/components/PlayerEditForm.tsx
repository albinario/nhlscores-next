import { pickers } from '@/app/lib/globals'
import { EPath, EPosition } from '@/enums'
import { useFetchData } from '@/hooks/useFetchData'
import { useState } from 'react'
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

type TCPlayerEditForm = {
	players?: TPlayer[]
}

type TPlayerToEdit = Omit<TPlayer, 'name'>

export const PlayerEditForm = ({ players }: TCPlayerEditForm) => {
	const [searchInput, setSearchInput] = useState('')

	const { formState, handleSubmit, register, reset } = useForm<TPlayerToEdit>()

	const editPlayer: SubmitHandler<TPlayerToEdit> = async (
		playerToEdit: TPlayerToEdit
	) => {
		try {
			patchPlayer(playerToEdit)
		} catch (error) {
			return alert(error || 'Something went wrong')
		} finally {
			setSearchInput('')
			reset()
		}
	}

	const { data: teamRecords } = useFetchData<TTeamRecord[]>(EPath.teamRecords)

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
					<Form.Select {...register(EForm.id, { required: true, min: 1 })}>
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
					<Form.Select {...register(EForm.picker)}>
						<option value=''>Picker</option>

						{pickers.map((picker) => (
							<option key={picker.code} value={picker.code}>
								{picker.name}
							</option>
						))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Select {...register(EForm.teamAbbrev)}>
						<option value=''>Team</option>

						{teamValues
							?.sort((a, b) => a.name.localeCompare(b.name))
							.map((team) => (
								<option key={team.abbrev} value={team.abbrev}>
									{team.name}
								</option>
							))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Control
						{...register(EForm.jersey)}
						placeholder='Jersey'
						type='number'
					/>
				</Col>

				<Col>
					<Form.Select {...register(EForm.pos)}>
						<option value=''>Pos</option>

						{Object.values(EPosition)
							.filter((pos) => pos !== EPosition.L && pos !== EPosition.R)
							.map((pos) => (
								<option key={pos} value={pos}>
									{pos}
								</option>
							))}
					</Form.Select>
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
