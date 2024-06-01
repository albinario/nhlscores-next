// import { useUpdatePlayer } from '../hooks/usePlayers'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'

export function PlayerEditForm({
	playersAll,
	teams,
}: {
	playersAll?: TPlayer[]
	teams?: TTeamSchedule[]
}) {
	const [jersey, setJersey] = useState(0)
	const [picker, setPicker] = useState('')
	const [playerToEditId, setPlayerToEditId] = useState(0)
	const [pos, setPos] = useState('')
	const [searchInput, setSearchInput] = useState('')
	const [teamAbbrev, setTeamAbbrev] = useState('')

	// const updatePlayer = useUpdatePlayer()

	const playerEdit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!playerToEditId) return alert('No player chosen')

		const playerToEdit: Partial<TPlayer> = {
			id: playerToEditId,
			picker,
			teamAbbrev,
			jersey,
			pos,
		}

		// updatePlayer.mutate(playerToEdit)

		setSearchInput('')
		setPicker('')
		setJersey(0)
		setPos('')
	}

	return (
		<Form onSubmit={playerEdit}>
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
					<Form.Select
						onChange={(e) => setPlayerToEditId(Number(e.target.value))}
					>
						<option value={0}>Player</option>
						{playersAll
							?.filter((player: TPlayer) =>
								player.name
									.toLowerCase()
									.includes(searchInput.toLocaleLowerCase())
							)
							.map((player: TPlayer) => (
								<option key={player.id} value={player.id}>
									{player.name}
								</option>
							))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Control
						onChange={(e) => setPicker(e.target.value.toUpperCase())}
						placeholder='Picker'
						type='text'
						value={picker}
					/>
				</Col>

				<Col>
					<Form.Select onChange={(e) => setTeamAbbrev(e.target.value)}>
						<option value={''}>Team</option>
						{teams
							?.sort((a, b) => a.name.localeCompare(b.name))
							.map((team, index) => (
								<option key={index} value={team.abbrev}>
									{team.name}
								</option>
							))}
					</Form.Select>
				</Col>

				<Col>
					<Form.Control
						onChange={(e) => setJersey(Number(e.target.value))}
						placeholder='Jersey'
						type='number'
						value={jersey ? jersey : ''}
					/>
				</Col>

				<Col>
					<Form.Control
						onChange={(e) => setPos(e.target.value.toUpperCase())}
						placeholder='Pos'
						type='text'
						value={pos}
					/>
				</Col>

				<Col>
					<Button
						className='form-control'
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

export default PlayerEditForm
