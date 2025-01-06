import { ESource } from '@/enums'
import { NextRequest } from 'next/server'
import { getGamesDate } from '@/services/nhlApi'
import { errorResponse, successResponse } from '@/services/responseHandler'
import type { TGame } from '@/types'

type TGamesRoute = {
	params: {
		date: string
	}
}

export async function GET(_req: NextRequest, { params }: TGamesRoute) {
	try {
		const games: TGame[] = await getGamesDate(params.date)

		return successResponse(games)
	} catch (error) {
		return errorResponse(
			error,
			`fetching games on ${params.date}: `,
			ESource.server
		)
	}
}
