import { EPosition } from '@/enums'
import type { TPlayer } from '@/types'

type TCMissing = {
	isAll?: boolean
	playersPicked?: TPlayer[]
}

export const Missing = ({ isAll, playersPicked }: TCMissing) => {
	const g =
		(isAll ? 8 : 2) -
		Number(playersPicked?.filter((p) => p.pos === EPosition.G).length)
	const d =
		(isAll ? 12 : 3) -
		Number(playersPicked?.filter((p) => p.pos === EPosition.D).length)
	const w =
		(isAll ? 16 : 4) -
		Number(playersPicked?.filter((p) => p.pos === EPosition.W).length)
	const c =
		(isAll ? 12 : 3) -
		Number(playersPicked?.filter((p) => p.pos === EPosition.C).length)

	const missingG = g !== 0
	const missingD = d !== 0
	const missingW = w !== 0
	const missingC = c !== 0

	const missingAny = missingG || missingD || missingW || missingC

	return missingAny ? (
		<div className='d-flex gap-3 mt-2'>
			{missingG && <span>G{g} </span>}
			{missingD && <span>D{d} </span>}
			{missingW && <span>W{w} </span>}
			{missingC && <span>C{c} </span>}
		</div>
	) : null
}
