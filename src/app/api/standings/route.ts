import { NextResponse } from 'next/server'
import { instance } from '@/services/axios'

export async function GET() {
	try {
		const response = await instance.get('/standings/now')
		return NextResponse.json(response.data.standings)
	} catch (error) {
		return NextResponse.json({
			error: 'Server error when fetching standings'
		})
	}
}
