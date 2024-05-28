import { getGames } from '@/services/nhlApi'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
	req: NextRequest,
	{ params }: { params: { date: string } }
) {
	try {
		return NextResponse.json(await getGames(params.date))
	} catch (error) {
		return NextResponse.json({
			error: 'Server error when fetching games'
		})
	}
}
