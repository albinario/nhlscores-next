import classNames from 'classnames'

export function PickersCell({
	players,
	textEnd,
}: {
	players: TPlayer[]
	textEnd?: boolean
}) {
	return (
		<td className={classNames({ 'text-end': textEnd })}>
			{players
				.sort((a, b) => a.jersey - b.jersey)
				.map((player) => `${player.picker}${player.jersey}`)
				.join(', ')}
		</td>
	)
}
