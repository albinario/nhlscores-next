import { useEffect, useState } from 'react'
import Fetching from '@/components/Fetching'
import { getDateTitle } from '@/helpers/getDateTitle'
import Button from 'react-bootstrap/Button'
import Arrow from '@/icons/arrow'

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
			<Button className='ps-0' onClick={dateDecrease}>
				<Arrow left={true} />
			</Button>

			<div className='fs-5 opacity-75'>{dateTitle}</div>

			<Button className='pe-0' onClick={dateIncrease}>
				<Arrow left={false} />
			</Button>

			{isLoading && <Fetching />}
		</header>
	)
}
