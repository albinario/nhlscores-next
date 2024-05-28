import { NextResponse } from 'next/server'
import { getTeamRecords } from '@/services/nhlApi'

export async function GET() {
	try {
		return NextResponse.json(await getTeamRecords())
	} catch (error) {
		return NextResponse.json({
			error: 'Server error when fetching standings'
		})
	}
}
