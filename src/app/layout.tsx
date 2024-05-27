import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'NHL Scores',
	description: 'NextJS application'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' data-bs-theme='dark'>
			<body>{children}</body>
		</html>
	)
}
