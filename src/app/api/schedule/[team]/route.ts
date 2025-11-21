import { NextRequest } from 'next/server'

import { age } from '@/app/lib/globals'
import { ESource } from '@/enums'
import { getScheduleTeam } from '@/services/nhlApi'
import { errorResponse, successResponse } from '@/services/responseHandler'
import type { TGame } from '@/types'

type TScheduleRoute = {
	params: Promise<{
		team: string
	}>
}

export async function GET(_req: NextRequest, { params }: TScheduleRoute) {
	const { team } = await params

	try {
		const scheduleTeam: TGame[] = await getScheduleTeam(team)

		return successResponse(scheduleTeam, { cacheMaxAge: age.day })
	} catch (error) {
		return errorResponse(
			error,
			`fetching schedule for team ${team}`,
			ESource.server,
		)
	}
}
