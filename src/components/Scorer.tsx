type TScorerComponent = {
	isSo?: boolean
	last?: boolean
	name: string
	pickedBy?: string
	toDate: number
}

export function Scorer({
	isSo,
	last,
	name,
	pickedBy,
	toDate,
}: TScorerComponent) {
	return (
		<span className='text-nowrap'>
			{last && ', '}
			<span className={pickedBy}>
				{name} {!isSo && '(' + toDate + ')'}
				{pickedBy && ' ' + pickedBy.toUpperCase()}
			</span>
		</span>
	)
}
