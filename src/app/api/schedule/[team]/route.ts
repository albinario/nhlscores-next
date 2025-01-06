import { ESource } from '@/enums'
import { NextRequest } from 'next/server'
import { getGamesTeam } from '@/services/nhlApi'
import { errorResponse, successResponse } from '@/services/responseHandler'
import type { TGame } from '@/types'

type TRouteParams = {
	params: {
		team: string
	}
}

export async function GET(_req: NextRequest, { params }: TRouteParams) {
	try {
		const gamesTeam: TGame[] = await getGamesTeam(params.team)

		return successResponse(gamesTeam)
	} catch (error) {
		return errorResponse(
			error,
			`fetching schedule for team ${params.team}`,
			ESource.server
		)
	}
}
