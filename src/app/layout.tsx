import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'NHL Scores',
	description: 'Next15 application',
	metadataBase: new URL('https://nhlscores-next.vercel.app/'),
	openGraph: {
		title: 'NHL Scores',
		images: '/apple-touch-icon-114x114.png',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' data-bs-theme='dark' data-scroll-behavior='smooth'>
			<body>{children}</body>
		</html>
	)
}
