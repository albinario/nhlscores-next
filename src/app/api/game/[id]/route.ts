import { getGame, getGames } from '@/services/nhlApi'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: number } }
) {
	try {
		return NextResponse.json(await getGame(params.id))
	} catch (error) {
		return NextResponse.json({
			error: 'Server error when fetching game',
		})
	}
}
