export function Scorer({
	isSo,
	last,
	name,
	pickedBy,
	toDate,
}: {
	isSo?: boolean
	last?: boolean
	name: string
	pickedBy?: string
	toDate: number
}) {
	return (
		<span className='text-nowrap'>
			{last && ', '}
			<span className={pickedBy}>
				{name} {!isSo && '(' + toDate + ')'}
				{pickedBy && ' ' + pickedBy}
			</span>
		</span>
	)
}
