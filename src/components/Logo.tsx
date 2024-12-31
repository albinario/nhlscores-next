import { getLogoUrl } from '@/helpers/getLogoUrl'
import Image from 'react-bootstrap/Image'

type TLogoComponent = {
	teamAbbrev: string
	className?: string
}

export const Logo = ({ teamAbbrev, className }: TLogoComponent) => (
	<Image
		alt={teamAbbrev}
		className={className}
		src={getLogoUrl(teamAbbrev)}
		onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
			const target = e.target as HTMLImageElement
			target.src = '/apple-touch-icon-57x57.png'
		}}
	/>
)
