import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'NHL Scores',
	description: 'Next14 application',
	openGraph: {
		title: 'NHL Scores',
		images: ['/apple-touch-icon-114x114.png'],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' data-bs-theme='dark'>
			<body>{children}</body>
		</html>
	)
}
