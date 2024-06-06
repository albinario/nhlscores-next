import { useEffect, useState } from 'react'
import Fetching from '@/components/Fetching'
import { getDateTitle } from '@/helpers/getDateTitle'

export default function Header({
	date,
	dateFormat,
	dateDecrease,
	dateIncrease,
	isLoading,
}: {
	date: string
	dateFormat: string
	dateDecrease: () => void
	dateIncrease: () => void
	isLoading: boolean
}) {
	const [dateTitle, setDateTitle] = useState('')

	useEffect(() => {
		setDateTitle(getDateTitle(date, dateFormat))
	}, [date, dateFormat])

	return (
		<header className='d-flex justify-content-between align-items-center my-1 position-relative'>
			<div className='pe-3 ps-1 py-2 pointer opacity-50' onClick={dateDecrease}>
				←
			</div>

			<div className='fs-5 opacity-75'>{dateTitle}</div>

			<div className='pe-1 ps-3 py-2 pointer opacity-50' onClick={dateIncrease}>
				→
			</div>

			{isLoading && <Fetching />}
		</header>
	)
}
