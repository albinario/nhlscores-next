import Alert from 'react-bootstrap/Alert'

type TAlertBox = {
	heading?: string
	text?: string
}

export const AlertBox = ({ heading, text }: TAlertBox) => (
	<Alert className='mt-3' variant='secondary'>
		{heading && <Alert.Heading>{heading}</Alert.Heading>}
		{text && <p className='mb-0'>{text}</p>}
	</Alert>
)
