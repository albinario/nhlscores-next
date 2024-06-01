import { getLogoUrl } from '@/helpers/getLogoUrl'
import Image from 'react-bootstrap/Image'

export function Logo({
	teamAbbrev,
	className,
}: {
	teamAbbrev: string
	className?: string
}) {
	return (
		<Image
			alt={teamAbbrev}
			className={className}
			src={getLogoUrl(teamAbbrev)}
		/>
	)
}
