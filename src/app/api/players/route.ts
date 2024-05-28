import { NextResponse } from 'next/server'
import { connectDB } from '@/app/lib/database'
import { Player } from '@/models/player'

export async function GET() {
	try {
		await connectDB()
		return NextResponse.json(
			await Player.find({ picker: { $ne: '' } }).sort('name')
		)
	} catch (err) {
		return NextResponse.json({
			error: 'Server error when fetching players',
		})
	}
}
