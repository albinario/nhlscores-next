// import { useCreatePlayer } from '../hooks/usePlayers'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
// import { searchPlayers } from '../services/SearchAPI'

export function PlayerAddForm({ playersAll }: { playersAll?: TPlayer[] }) {
	const [jersey, setJersey] = useState(0)
	const [name, setName] = useState('')
	const [picker, setPicker] = useState('')
	const [playerToAddId, setPlayerToAddId] = useState(0)
	const [players, setPlayers] = useState<TPlayerSearch[] | null>(null)
	const [pos, setPos] = useState('')
	const [searchInput, setSearchInput] = useState('')
	const [teamAbbrev, setTeamAbbrev] = useState('')

	// const createPlayer = useCreatePlayer()

	const search = async () => {
		// const players = await searchPlayers(searchInput)
		// setPlayers(players.filter((player) => player.sweaterNumber))
	}

	const setPlayerToAddStates = (id: string) => {
		const player = players?.find((player) => player.playerId === id)

		if (player) {
			setJersey(player.sweaterNumber)
			setName(player.name)
			setPlayerToAddId(Number(id))
			setPos(
				player.positionCode === 'L' || player.positionCode === 'R'
					? 'W'
					: player.positionCode
			)
			setTeamAbbrev(player.teamAbbrev)
		}
	}

	const playerAdd = (e: React.FormEvent) => {
		e.preventDefault()

		if (playersAll?.find((player) => player.id === playerToAddId))
			return alert('Player already added')

		const playerToAdd: TPlayer = {
			id: playerToAddId,
			name,
			jersey,
			pos,
			teamAbbrev,
			picker,
		}

		// createPlayer.mutate(playerToAdd)

		setJersey(0)
		setName('')
		setPicker('')
		setPos('')
	}

	return (
		<Form onSubmit={playerAdd}>
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
					<Form.Select onChange={(e) => setPlayerToAddStates(e.target.value)}>
						<option value={0}>Player</option>
						{players?.map((player) => (
							<option key={player.playerId} value={player.playerId}>
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
					<Button
						disabled={
							!teamAbbrev || !pos || !jersey || !picker || !playerToAddId
						}
						type='submit'
						className='form-control'
						variant='outline-success'
					>
						+
					</Button>
				</Col>
			</Row>
		</Form>
	)
}
