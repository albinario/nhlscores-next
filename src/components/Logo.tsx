import { getLogoUrl } from '@/helpers/getLogoUrl'
import Image from 'react-bootstrap/Image'

type TCLogo = {
	teamAbbrev: string
	className?: string
}

export const Logo = ({ teamAbbrev, className }: TCLogo) => (
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
