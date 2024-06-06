import { useState } from 'react'
import useFetchData from '@/hooks/useFetchData'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { mutate } from 'swr'

export function PlayerEditForm({ players }: { players?: TPlayer[] }) {
	const [jersey, setJersey] = useState(0)
	const [picker, setPicker] = useState('')
	const [playerToEditId, setPlayerToEditId] = useState(0)
	const [pos, setPos] = useState('')
	const [searchInput, setSearchInput] = useState('')
	const [teamAbbrev, setTeamAbbrev] = useState('')

	const { data: teamRecords } = useFetchData<TTeamRecord[]>('teamRecords')
	const teamValues = teamRecords?.map((teamRecord) => ({
		abbrev: teamRecord.teamAbbrev.default,
		name: teamRecord.teamName.default,
		value: Number(teamRecord.leagueL10Sequence),
	}))

	const playerEdit = async (e: React.FormEvent) => {
		e.preventDefault()

		const playerToEdit: Partial<TPlayer> = {
			id: playerToEditId,
			picker,
			teamAbbrev,
			jersey,
			pos,
		}

		try {
			await fetch('/api/players/', {
				method: 'PATCH',
				body: JSON.stringify(playerToEdit),
			})
		} catch (error) {
			return alert(error || 'Something went wrong')
		}

		console.log('yysydydy')

		mutate('players')

		setSearchInput('')
		setPicker('')
		setJersey(0)
		setPos('')
		setTeamAbbrev('')
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
						{players
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
						{teamValues
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
						disabled={!playerToEditId}
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
