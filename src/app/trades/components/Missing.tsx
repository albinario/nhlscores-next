import type { TPlayer } from '@/types'

type TMissingComponent = {
	isAll?: boolean
	playersPicked: TPlayer[]
}

export function Missing({ isAll, playersPicked }: TMissingComponent) {
	const g = (isAll ? 8 : 2) - playersPicked.filter((p) => p.pos === 'G').length
	const d = (isAll ? 12 : 3) - playersPicked.filter((p) => p.pos === 'D').length
	const w = (isAll ? 16 : 4) - playersPicked.filter((p) => p.pos === 'W').length
	const c = (isAll ? 12 : 3) - playersPicked.filter((p) => p.pos === 'C').length

	return (
		<div className='mt-2'>
			{!!g && <span>G{g} </span>}
			{!!d && <span>D{d} </span>}
			{!!w && <span>W{w} </span>}
			{!!c && <span>C{c} </span>}
		</div>
	)
}
