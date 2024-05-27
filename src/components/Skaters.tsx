import Skater from './Skater'
import { getLogoUrl } from '../helpers/getLogoUrl'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Table from 'react-bootstrap/Table'
import type { TPlayerPicked, SkaterStats } from '../types'

interface IProps {
	defenders: SkaterStats[]
	forwards: SkaterStats[]
	playersPicked?: TPlayerPicked[]
	teamAbbrev: string
}

const Skaters: React.FC<IProps> = ({
	defenders,
	forwards,
	playersPicked,
	teamAbbrev
}) => (
	<Col>
		<Table borderless className='small text-center' size='sm'>
			<thead>
				<tr>
					<th className='ps-0 text-start'>
						<Image src={getLogoUrl(teamAbbrev)} />
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

export default Skaters
