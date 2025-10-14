import { ESource } from '@/enums'
import { NextRequest } from 'next/server'
import { getGameDetails } from '@/services/nhlApi'
import { errorResponse, successResponse } from '@/services/responseHandler'
import type { TGameDetails } from '@/types'

type TGameRoute = {
	params: Promise<{
		id: string
	}>
}

export async function GET(_req: NextRequest, { params }: TGameRoute) {
	try {
		const { id } = await params

		if (!id || isNaN(Number(id))) {
			return errorResponse(
				new Error('Invalid game ID'),
				'Invalid game ID provided',
				ESource.server
			)
		}

		const gameDetails: TGameDetails = await getGameDetails(Number(id))
		const cacheMaxAge = gameDetails.landing?.gameState === 'FINAL' ? 3600 : 60

		return successResponse(gameDetails, { cacheMaxAge })
	} catch (error) {
		const { id } = await params
		return errorResponse(error, `fetching game ${id}`, ESource.server)
	}
}
