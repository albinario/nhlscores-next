import { useEffect, useState } from 'react'
import Fetching from '@/components/Fetching'
import { getDateTitle } from '@/helpers/getDateTitle'
import Arrow from '@/icons/Arrow'

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
			<div className='py-2 pe-3 ps-0 pointer' onClick={dateDecrease}>
				<Arrow left={true} />
			</div>

			<div className='fs-5 opacity-75'>{dateTitle}</div>

			<div className='py-2 ps-3 pe-0 pointer' onClick={dateIncrease}>
				<Arrow left={false} />
			</div>

			{isLoading && <Fetching />}
		</header>
	)
}
