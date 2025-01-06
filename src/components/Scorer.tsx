type TCScorer = {
	firstName: string
	isSo?: boolean
	lastName: string
	pickedBy?: string
	secondAssist?: boolean
	toDate: number
}

export const Scorer = ({
	firstName,
	isSo,
	lastName,
	pickedBy,
	secondAssist,
	toDate,
}: TCScorer) => (
	<span className='text-nowrap'>
		{secondAssist && ', '}

		<span className={pickedBy}>
			{firstName} {lastName} {!isSo && `(${toDate})`}
			{pickedBy && ` ${pickedBy.toUpperCase()}`}
		</span>
	</span>
)
