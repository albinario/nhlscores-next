import { useMemo } from 'react'

import Link from 'next/link'

export const Footer = () => {
	const currentYear = useMemo(() => new Date().getFullYear(), [])

	const copyrightYears = useMemo(() => {
		const startYear = 2018

		return currentYear > startYear
			? `${startYear}-${currentYear}`
			: startYear.toString()
	}, [currentYear])

	return (
		<footer className='mt-3 small text-secondary' role='contentinfo'>
			<p>
				This is a non-profit website. All NHL logos & team marks as well as all
				other proprietary{' '}
				<Link href='/trades' className='text-decoration-none'>
					materials
				</Link>{' '}
				posted here are the property of the NHL and the respective NHL teams and
				may not be reproduced without the permission of the NHL.{' '}
				<Link href='/schedule' className='text-decoration-none'>
					Schedule
				</Link>
				. All Rights Reserved.
			</p>

			<p>© Albin Lindeborg {copyrightYears}</p>
		</footer>
	)
}
