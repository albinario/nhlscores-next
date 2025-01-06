import { connectMongo } from '@/app/lib/database'
import { ESource } from '@/enums'
import { Player } from '@/models/player'
import mongoose from 'mongoose'
import { NextRequest } from 'next/server'
import {
	errorResponse,
	response,
	successResponse,
} from '@/services/responseHandler'
import type { TPlayer } from '@/types'

export async function GET() {
	try {
		await connectMongo()

		const players: TPlayer[] = await Player.find().sort('name')

		return successResponse(players)
	} catch (error) {
		return errorResponse(error, 'fetching players', ESource.server)
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const body: Partial<TPlayer> = await req.json()

		if (!body.id) return response('Player ID is required', 400)

		await connectMongo()

		const player = await Player.findOne({ id: body.id })

		if (!player) return response('No player with this id', 404)

		const updates: Partial<TPlayer> = {}

		if (body.picker) updates.picker = body.picker
		if (body.jersey) updates.jersey = body.jersey
		if (body.pos) updates.pos = body.pos
		if (body.teamAbbrev) updates.teamAbbrev = body.teamAbbrev

		if (Object.keys(updates).length === 0) {
			updates.picker = ''
		}

		await player.updateOne(updates)

		return successResponse()
	} catch (error) {
		const errorMessage = 'updating player'

		if (error instanceof mongoose.Error.ValidationError) {
			return errorResponse(error, errorMessage, ESource.mongoose)
		}

		return errorResponse(error, errorMessage, ESource.server)
	}
}

export async function POST(req: NextRequest) {
	try {
		await connectMongo()

		const body: TPlayer = await req.json()
		const player = new Player(body)
		await player.save()

		return successResponse()
	} catch (error) {
		const errorMessage = 'creating player'

		if (error instanceof mongoose.Error.ValidationError) {
			return errorResponse(error, errorMessage, ESource.mongoose)
		}

		return errorResponse(error, errorMessage, ESource.server)
	}
}
