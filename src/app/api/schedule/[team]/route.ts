import { NextRequest, NextResponse } from 'next/server'
import { getGamesTeam } from '@/services/nhlApi'

export async function GET(
	req: NextRequest,
	{ params }: { params: { team: string } }
) {
	try {
		return NextResponse.json(await getGamesTeam(params.team))
	} catch (error) {
		return NextResponse.json({
			error: 'Server error when fetching schedule for ' + params.team,
		})
	}
}
