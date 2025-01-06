import { connectMongo } from '@/app/lib/database'
import { ESource } from '@/enums'
import { Player } from '@/models/player'
import { errorResponse, successResponse } from '@/services/responseHandler'
import type { TPlayer } from '@/types'

export async function GET() {
	try {
		await connectMongo()

		const playersPicked: TPlayer[] = await Player.find({
			picker: { $ne: '' },
		}).sort('name')

		return successResponse(playersPicked)
	} catch (error) {
		return errorResponse(error, 'fetching picked players', ESource.server)
	}
}
