import { getLogoUrl } from '../helpers/getLogoUrl'
import Image from 'react-bootstrap/Image'

interface IProps {
	teamAbbrev: string
}

const Logo: React.FC<IProps> = ({ teamAbbrev }) => (
	<Image src={getLogoUrl(teamAbbrev)} />
)

export default Logo
