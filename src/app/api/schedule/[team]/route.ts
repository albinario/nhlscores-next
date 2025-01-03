import { NextRequest, NextResponse } from 'next/server'
import { getGamesTeam } from '@/services/nhlApi'

type TRouteParams = {
	params: {
		team: string
	}
}

export async function GET(_req: NextRequest, { params }: TRouteParams) {
	try {
		return NextResponse.json(await getGamesTeam(params.team))
	} catch (error) {
		return NextResponse.json({
			error: `Server error when fetching schedule for ${params.team}`,
		})
	}
}
