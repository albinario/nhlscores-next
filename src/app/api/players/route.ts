import { connectDB } from '@/app/lib/database'
import { Player } from '@/models/player'
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'
import type { TPlayer } from '@/types'

export async function GET() {
	try {
		await connectDB()

		return NextResponse.json(await Player.find().sort('name'))
	} catch (err) {
		return NextResponse.json({
			error: 'Server error when fetching players',
		})
	}
}

export async function PATCH(req: NextRequest) {
	const body: Partial<TPlayer> = await req.json()

	try {
		await connectDB()

		const player = await Player.findOne({ id: body.id })

		if (!player) {
			return NextResponse.json(
				{ error: 'No player with this id' },
				{ status: 404 }
			)
		}

		if (!body.picker && !body.jersey && !body.pos && !body.teamAbbrev) {
			await player.updateOne({ picker: '' })
		} else {
			if (body.picker) await player.updateOne({ picker: body.picker })
			if (body.jersey) await player.updateOne({ jersey: body.jersey })
			if (body.pos) await player.updateOne({ pos: body.pos.toUpperCase() })
			if (body.teamAbbrev)
				await player.updateOne({ teamAbbrev: body.teamAbbrev })
		}

		return new NextResponse()
	} catch (err) {
		if (err instanceof mongoose.Error.ValidationError) {
			return NextResponse.json({ error: err.message }, { status: 400 })
		}
		return NextResponse.json(
			{ error: 'Server error when updating player' },
			{ status: 500 }
		)
	}
}

export async function POST(req: NextRequest) {
	try {
		await connectDB()
		const body: TPlayer = await req.json()
		const player = new Player(body)
		await player.save()

		return new NextResponse()
	} catch (err) {
		if (err instanceof mongoose.Error.ValidationError) {
			return NextResponse.json({ error: err.message }, { status: 400 })
		}

		return NextResponse.json(
			{ error: 'Server error when creating player' },
			{ status: 500 }
		)
	}
}
