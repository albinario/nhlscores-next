import { ESource } from '@/enums'
import { NextRequest } from 'next/server'
import { getGameDetails } from '@/services/nhlApi'
import { errorResponse, successResponse } from '@/services/responseHandler'
import type { TGameDetails } from '@/types'

type TRouteParams = {
	params: {
		id: number
	}
}

export async function GET(_req: NextRequest, { params }: TRouteParams) {
	try {
		const gameDetails: TGameDetails = await getGameDetails(params.id)

		return successResponse(gameDetails)
	} catch (error) {
		return errorResponse(error, `fetching game ${params.id}`, ESource.server)
	}
}
