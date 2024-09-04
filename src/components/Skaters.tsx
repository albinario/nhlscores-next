import { Skater } from '@/components/Skater'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import type { TPlayer, TSkaterStats } from '@/types'
import { Logo } from './Logo'

export function Skaters({
	defenders,
	forwards,
	playersPicked,
	teamAbbrev,
}: {
	defenders: TSkaterStats[]
	forwards: TSkaterStats[]
	playersPicked?: TPlayer[]
	teamAbbrev: string
}) {
	return (
		<Col>
			<Table borderless className='small text-center' size='sm'>
				<thead>
					<tr>
						<th className='ps-0 text-start'>
							<Logo teamAbbrev={teamAbbrev} />
						</th>
						<th>G</th>
						<th>A</th>
						<th>+/-</th>
						<th>S</th>
						<th>PIM</th>
						<th>H</th>
						<th>B</th>
						<th className='pe-0 text-end'>TOI | PP | SH </th>
					</tr>
				</thead>
				<tbody>
					{defenders
						.concat(forwards)
						.sort((a, b) => a.sweaterNumber - b.sweaterNumber)
						.map((skater) => (
							<Skater
								key={skater.playerId}
								pickedBy={
									playersPicked?.find((player) => player.id === skater.playerId)
										?.picker
								}
								skater={skater}
							/>
						))}
				</tbody>
			</Table>
		</Col>
	)
}
