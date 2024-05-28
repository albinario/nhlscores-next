import { getGameDetails, getGamesDate } from '@/services/nhlApi'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		return NextResponse.json(await getGameDetails(params.id))
	} catch (error) {
		return NextResponse.json({
			error: 'Server error when fetching game',
		})
	}
}
