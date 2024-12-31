import Link from 'next/link'

export const Footer = () => (
	<footer className='mt-3 small text-secondary'>
		<p className='small'>
			This is a non-profit website. All NHL logos & team marks as well as all
			other proprietary <Link href='/trades'>materials</Link> posted here are
			the property of the NHL and the respective NHL teams and may not be
			reproduced without the permission of the NHL.{' '}
			<Link href='/schedule'>Schedule</Link>. All Rights Reserved.
			<span className='d-flex align-items-center mt-1'>
				© Albin Lindeborg 2018-{new Date().getFullYear()}
			</span>
		</p>
	</footer>
)
