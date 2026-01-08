import { NextRequest } from 'next/server'

import { ESource } from '@/enums'
import { getGamesDate } from '@/services/nhlApi'
import { errorResponse, successResponse } from '@/services/responseHandler'
import type { TGame } from '@/types'

type TGamesRoute = {
	params: Promise<{
		date: string
	}>
}

export async function GET(_req: NextRequest, { params }: TGamesRoute) {
	try {
		const { date } = await params

		if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
			return errorResponse(
				new Error('Invalid date format'),
				'Date must be in YYYY-MM-DD format',
				ESource.server,
			)
		}

		const games: TGame[] = await getGamesDate(date)

		return successResponse(games)
	} catch (error) {
		const { date } = await params
		return errorResponse(error, `fetching games on ${date}`, ESource.server)
	}
}
