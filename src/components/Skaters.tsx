import { Logo } from './Logo'
import { Skater } from '@/components/Skater'
import { useMemo } from 'react'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import type { TPlayer, TSkaterStats } from '@/types'

type TSkaters = {
	defenders: TSkaterStats[]
	forwards: TSkaterStats[]
	playersPicked?: TPlayer[]
	teamAbbrev: string
}

export const Skaters = ({
	defenders,
	forwards,
	playersPicked = [],
	teamAbbrev,
}: TSkaters) => {
	const skatersWithData = useMemo(() => {
		const playerMap = new Map(
			playersPicked.map((player) => [player.id, player])
		)

		const allSkaters = defenders.concat(forwards)

		const sortedSkaters = allSkaters.sort(
			(a, b) => a.sweaterNumber - b.sweaterNumber
		)

		return sortedSkaters.map((skater) => ({
			skater,
			pickedBy: playerMap.get(skater.playerId)?.picker,
		}))
	}, [defenders, forwards, playersPicked])

	return (
		<Col>
			<Table borderless className='small text-center' size='sm'>
				<thead>
					<tr role='row'>
						<th className='ps-0 text-start' scope='col'>
							<Logo teamAbbrev={teamAbbrev} />
						</th>
						<th scope='col'>G</th>
						<th scope='col'>A</th>
						<th scope='col'>+/-</th>
						<th scope='col'>S</th>
						<th scope='col'>PIM</th>
						<th scope='col'>H</th>
						<th scope='col'>B</th>
						<th className='pe-0 text-end' scope='col'>
							TOI
						</th>
					</tr>
				</thead>

				<tbody>
					{skatersWithData.map(({ skater, pickedBy }) => (
						<Skater key={skater.playerId} pickedBy={pickedBy} skater={skater} />
					))}
				</tbody>
			</Table>
		</Col>
	)
}
