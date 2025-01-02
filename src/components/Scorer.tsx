type TCScorer = {
	isSo?: boolean
	last?: boolean
	name: string
	pickedBy?: string
	toDate: number
}

export const Scorer = ({ isSo, last, name, pickedBy, toDate }: TCScorer) => (
	<span className='text-nowrap'>
		{last && ', '}
		<span className={pickedBy}>
			{name} {!isSo && '(' + toDate + ')'}
			{pickedBy && ' ' + pickedBy.toUpperCase()}
		</span>
	</span>
)
