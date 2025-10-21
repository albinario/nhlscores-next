import { useMemo } from 'react'

type TScorer = {
	firstName: string
	isSo?: boolean
	lastName: string
	pickedBy?: string
	secondAssist?: boolean
	toDate: number
}

export const Scorer = ({
	firstName,
	isSo = false,
	lastName,
	pickedBy,
	secondAssist = false,
	toDate,
}: TScorer) => {
	const scorerData = useMemo(() => {
		const fullName = `${firstName} ${lastName}`
		const statsDisplay = !isSo ? `(${toDate})` : ''
		const pickerDisplay = pickedBy ? ` ${pickedBy.toUpperCase()}` : ''
		const separator = secondAssist ? ', ' : ''

		return {
			fullName,
			separator,
			statsDisplay,
			pickerDisplay,
		}
	}, [firstName, isSo, lastName, pickedBy, secondAssist, toDate])

	return (
		<span className='text-nowrap'>
			{scorerData.separator}

			<span className={pickedBy || ''}>
				{scorerData.fullName} {scorerData.statsDisplay}
				{scorerData.pickerDisplay}
			</span>
		</span>
	)
}
