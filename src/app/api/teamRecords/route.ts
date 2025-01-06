import { ESource } from '@/enums'
import { getTeamRecords } from '@/services/nhlApi'
import { errorResponse, successResponse } from '@/services/responseHandler'
import type { TTeamRecord } from '@/types'

export async function GET() {
	try {
		const teamRecords = await getTeamRecords()

		return successResponse<TTeamRecord[]>(teamRecords)
	} catch (error) {
		return errorResponse(error, 'fetching team records', ESource.server)
	}
}
