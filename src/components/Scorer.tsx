interface IProps {
	isSo?: boolean
	last?: boolean
	name: string
	pickedBy?: string
	toDate: number
}

const Scorer: React.FC<IProps> = ({ isSo, last, name, pickedBy, toDate }) => (
	<span className='text-nowrap'>
		{last && ', '}
		<span className={pickedBy}>
			{name} {!isSo && '(' + toDate + ')'}
			{pickedBy && ' ' + pickedBy}
		</span>
	</span>
)

export default Scorer
