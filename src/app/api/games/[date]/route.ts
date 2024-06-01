import { NextRequest, NextResponse } from 'next/server'
import { getGamesDate } from '@/services/nhlApi'

export async function GET(
	req: NextRequest,
	{ params }: { params: { date: string } }
) {
	try {
		return NextResponse.json(await getGamesDate(params.date))
	} catch (error) {
		return NextResponse.json({
			error: 'Server error when fetching games on ' + params.date,
		})
	}
}
