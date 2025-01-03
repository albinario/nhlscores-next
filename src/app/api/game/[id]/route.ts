import { NextRequest, NextResponse } from 'next/server'
import { getGameDetails } from '@/services/nhlApi'

type TRouteParams = {
	params: {
		id: number
	}
}

export async function GET(_req: NextRequest, { params }: TRouteParams) {
	try {
		return NextResponse.json(await getGameDetails(params.id))
	} catch (error) {
		return NextResponse.json({
			error: `Server error when fetching game ${params.id}`,
		})
	}
}
