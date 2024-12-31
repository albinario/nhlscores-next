import Spinner from 'react-bootstrap/Spinner'

export const Fetching = () => (
	<Spinner
		animation='grow'
		className='position-absolute end-0 me-5'
		size='sm'
		variant='warning'
	/>
)
