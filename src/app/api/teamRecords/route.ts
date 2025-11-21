import { age } from '@/app/lib/globals'
import { ESource } from '@/enums'
import { getTeamRecords } from '@/services/nhlApi'
import { errorResponse, successResponse } from '@/services/responseHandler'

export async function GET() {
	try {
		const teamRecords = await getTeamRecords()

		return successResponse(teamRecords, { cacheMaxAge: age.day })
	} catch (error) {
		return errorResponse(error, 'fetching team records', ESource.server)
	}
}
