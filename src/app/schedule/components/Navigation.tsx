import Fetching from './Fetching'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink, Link } from 'react-router-dom'

const Navigation = () => (
	<Navbar bg='dark' className='py-0' variant='dark'>
		<Navbar.Brand as={Link} to='/'>
			Trade center
		</Navbar.Brand>
		<Fetching />

		<Nav className='ms-auto'>
			<Nav.Link as={NavLink} to='/picks'>
				Picks
			</Nav.Link>
			<Nav.Link as={NavLink} to='/schedule'>
				Schedule
			</Nav.Link>
		</Nav>
	</Navbar>
)

export default Navigation
