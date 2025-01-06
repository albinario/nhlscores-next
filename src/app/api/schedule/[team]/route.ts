import { ESource } from '@/enums'
import { NextRequest } from 'next/server'
import { getScheduleTeam } from '@/services/nhlApi'
import { errorResponse, successResponse } from '@/services/responseHandler'
import type { TGame } from '@/types'

type TScheduleRoute = {
	params: {
		team: string
	}
}

export async function GET(_req: NextRequest, { params }: TScheduleRoute) {
	try {
		const scheduleTeam: TGame[] = await getScheduleTeam(params.team)

		return successResponse(scheduleTeam)
	} catch (error) {
		return errorResponse(
			error,
			`fetching schedule for team ${params.team}`,
			ESource.server
		)
	}
}
