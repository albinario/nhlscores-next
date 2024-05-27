import { getLogoUrl } from '../helpers/getLogoUrl'
import type { Team } from '../types'

interface IProps {
	team: Team
}

const Logo: React.FC<IProps> = ({ team }) => (
	<img
		src={getLogoUrl(team.abbrev)}
		alt={team.placeName.default + ' ' + team.name.default}
	/>
)

export default Logo
