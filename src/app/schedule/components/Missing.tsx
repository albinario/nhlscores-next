import type { Player } from '../types'

interface IProps {
	all: boolean
	players: Player[]
}

const Missing: React.FC<IProps> = (props) => {
	const g =
		(props.all ? 8 : 2) - props.players.filter((p) => p.pos === 'G').length
	const d =
		(props.all ? 12 : 3) - props.players.filter((p) => p.pos === 'D').length
	const w =
		(props.all ? 16 : 4) - props.players.filter((p) => p.pos === 'W').length
	const c =
		(props.all ? 12 : 3) - props.players.filter((p) => p.pos === 'C').length

	return (
		<div className='mt-2'>
			{!!g && <span>G{g} </span>}
			{!!d && <span>D{d} </span>}
			{!!w && <span>W{w} </span>}
			{!!c && <span>C{c} </span>}
		</div>
	)
}

export default Missing
