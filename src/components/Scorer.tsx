type TCScorer = {
	isSo?: boolean
	last?: boolean
	nameFirst: string
	nameLast: string
	pickedBy?: string
	toDate: number
}

export const Scorer = ({
	isSo,
	last,
	nameFirst,
	nameLast,
	pickedBy,
	toDate,
}: TCScorer) => (
	<span className='text-nowrap'>
		{last && ', '}

		<span className={pickedBy}>
			{nameFirst} {nameLast} {!isSo && `(${toDate})`}
			{pickedBy && ` ${pickedBy.toUpperCase()}`}
		</span>
	</span>
)
