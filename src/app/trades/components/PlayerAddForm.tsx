import { useState } from 'react'
import { EQueryKey } from '@/enums'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import { searchPlayers } from '@/services/searchAPI'
import { mutate } from 'swr'
import type { TPlayer, TPlayerSearch } from '@/types'

export function PlayerAddForm({ players }: { players?: TPlayer[] }) {
	const [jersey, setJersey] = useState(0)
	const [name, setName] = useState('')
	const [picker, setPicker] = useState('')
	const [playerToAddId, setPlayerToAddId] = useState(0)
	const [playersSearched, setPlayersSearched] = useState<
		TPlayerSearch[] | null
	>(null)
	const [pos, setPos] = useState('')
	const [searchInput, setSearchInput] = useState('')
	const [teamAbbrev, setTeamAbbrev] = useState('')

	const search = async () => {
		const players = await searchPlayers(searchInput)
		setPlayersSearched(players.filter((player) => player.sweaterNumber))
	}

	const setPlayerToAddStates = (id: string) => {
		const player = playersSearched?.find((player) => player.playerId === id)

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

	const playerAdd = async (e: React.FormEvent) => {
		e.preventDefault()

		if (players?.find((player) => player.id === playerToAddId))
			return alert('Player already added')

		const playerToAdd: TPlayer = {
			id: playerToAddId,
			name,
			jersey,
			pos,
			teamAbbrev,
			picker,
		}

		try {
			await fetch('/api/players', {
				method: 'POST',
				body: JSON.stringify(playerToAdd),
			})
		} catch (error) {
			return alert(error || 'Something went wrong')
		}

		mutate(EQueryKey.playersPicked)

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
						{playersSearched?.map((player) => (
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
						className='form-control'
						disabled={
							!teamAbbrev || !pos || !jersey || !picker || !playerToAddId
						}
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
