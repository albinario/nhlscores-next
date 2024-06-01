export function Missing({
	all,
	players,
}: {
	all: boolean
	players: TPlayer[]
}) {
	const g = (all ? 8 : 2) - players.filter((p) => p.pos === 'G').length
	const d = (all ? 12 : 3) - players.filter((p) => p.pos === 'D').length
	const w = (all ? 16 : 4) - players.filter((p) => p.pos === 'W').length
	const c = (all ? 12 : 3) - players.filter((p) => p.pos === 'C').length

	return (
		<div className='mt-2'>
			{!!g && <span>G{g} </span>}
			{!!d && <span>D{d} </span>}
			{!!w && <span>W{w} </span>}
			{!!c && <span>C{c} </span>}
		</div>
	)
}
