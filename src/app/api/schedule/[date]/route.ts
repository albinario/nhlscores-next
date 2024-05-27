import { NextRequest, NextResponse } from 'next/server'
import { instance } from '@/services/axios'

export async function GET(
	req: NextRequest,
	{ params }: { params: { date: string } }
) {
	try {
		const response = await instance.get('/schedule/' + params.date)
		return NextResponse.json(response.data.gameWeek[0].games)
	} catch (error) {
		return NextResponse.json({
			error: 'Server error when fetching standings'
		})
	}
}
