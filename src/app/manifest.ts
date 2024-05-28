import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'NHL Scores',
		short_name: 'NHL Scores',
		description: 'Using Next14',
		start_url: '/',
		display: 'standalone',
		background_color: '#222529',
		theme_color: '#222529',
		icons: [
			{
				src: '/apple-touch-icon-57x57.png',
				sizes: '57x57',
				type: 'image/png',
			},
			{
				src: '/apple-touch-icon-72x72.png',
				sizes: '72x72',
				type: 'image/png',
			},
			{
				src: '/apple-touch-icon-114x114.png',
				sizes: '114x114',
				type: 'image/png',
			},
			{
				src: '/apple-touch-icon-120x120.png',
				sizes: '120x120',
				type: 'image/png',
			},
			{
				src: '/apple-touch-icon-144x144.png',
				sizes: '144x144',
				type: 'image/png',
			},

			{
				src: 'favicon.ico',
				sizes: '48x48',
				type: 'image/x-icon',
			},
		],
		screenshots: [
			{
				src: '/screen-narrow.png',
				sizes: '798x1344',
				type: 'image/png',
			},
			{
				src: '/screen-wide.png',
				sizes: '2420x1500',
				type: 'image/png',
			},
		],
	}
}
