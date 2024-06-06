import { connectDB } from '@/app/lib/database'
import { NextRequest, NextResponse } from 'next/server'
import { Player } from '@/models/player'
import mongoose from 'mongoose'

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
	const reqBody: Partial<TPlayer> = await req.json()

	try {
		const player = await Player.findOne({ id: reqBody.id })

		if (!player) {
			return NextResponse.json(
				{ error: 'No player with this id' },
				{ status: 404 }
			)
		}

		const noValues =
			!reqBody.picker && !reqBody.jersey && !reqBody.pos && !reqBody.teamAbbrev

		if (noValues) {
			await player.updateOne({ picker: '' })
		} else {
			if (reqBody.picker) await player.updateOne({ picker: reqBody.picker })

			if (reqBody.jersey) await player.updateOne({ jersey: reqBody.jersey })

			if (reqBody.pos) await player.updateOne({ pos: reqBody.pos })

			if (reqBody.teamAbbrev)
				await player.updateOne({ teamAbbrev: reqBody.teamAbbrev })
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
		const body = await req.json()
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
