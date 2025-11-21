import { useMemo } from 'react'

import Spinner from 'react-bootstrap/Spinner'

import { getDateTitle } from '@/helpers/getDateTitle'

type THeader = {
	date: string
	dateDecrease: () => void
	dateIncrease: () => void
	isLoading: boolean
}

export const Header = ({
	date,
	dateDecrease,
	dateIncrease,
	isLoading,
}: THeader) => {
	const dateTitle = useMemo(() => getDateTitle(date), [date])

	return (
		<header className='d-flex justify-content-between align-items-center my-1 position-relative'>
			<button
				className='btn pe-3 ps-1 py-2 opacity-50 border-0'
				onClick={dateDecrease}
				type='button'
			>
				←
			</button>

			<div className='fs-5 opacity-75'>{dateTitle}</div>

			<button
				className='btn pe-1 ps-3 py-2 opacity-50 border-0'
				onClick={dateIncrease}
				type='button'
			>
				→
			</button>

			{isLoading && (
				<Spinner
					animation='grow'
					className='position-absolute end-0 me-5'
					size='sm'
					variant='warning'
				/>
			)}
		</header>
	)
}
