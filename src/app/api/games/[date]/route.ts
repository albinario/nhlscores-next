import { NextRequest, NextResponse } from 'next/server'
import { getGamesDate } from '@/services/nhlApi'

type TRouteParams = {
	params: {
		date: string
	}
}

export async function GET(_req: NextRequest, { params }: TRouteParams) {
	try {
		return NextResponse.json(await getGamesDate(params.date))
	} catch (error) {
		return NextResponse.json({
			error: `Server error when fetching games on ${params.date}`,
		})
	}
}
