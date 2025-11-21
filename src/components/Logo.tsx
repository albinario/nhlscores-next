import { useCallback, useMemo } from 'react'

import Image from 'react-bootstrap/Image'

import { fallBackLogoUrl } from '@/app/lib/globals'
import { getLogoUrl } from '@/helpers/getLogoUrl'

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
		[teamAbbrev],
	)

	const handleError = useCallback(
		(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
			const target = e.target as HTMLImageElement
			target.src = fallBackLogoUrl
		},
		[],
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
