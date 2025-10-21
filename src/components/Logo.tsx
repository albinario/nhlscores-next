import { getLogoUrl } from '@/helpers/getLogoUrl'
import { useMemo, useCallback } from 'react'
import Image from 'react-bootstrap/Image'

type TLogo = {
	className?: string
	teamAbbrev: string
}

export const Logo = ({ className, teamAbbrev }: TLogo) => {
	const { altText, logoUrl } = useMemo(
		() => ({
			altText: `${teamAbbrev} team logo`,
			logoUrl: getLogoUrl(teamAbbrev),
		}),
		[teamAbbrev]
	)

	const handleError = useCallback(
		(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
			const target = e.target as HTMLImageElement
			target.src = '/apple-touch-icon-57x57.png'
		},
		[]
	)

	return (
		<Image
			alt={altText}
			className={className}
			src={logoUrl}
			onError={handleError}
		/>
	)
}
