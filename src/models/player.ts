import { model, models, Schema } from 'mongoose'

import { EPosition } from '@/enums'
import type { TPlayer } from '@/types'

const PlayerSchema: Schema = new Schema<TPlayer>({
	id: {
		type: Number,
		required: true,
	},
	jersey: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	picker: {
		type: String,
		maxlength: 1,
	},
	pos: {
		type: String,
		enum: Object.values(EPosition),
		required: true,
	},
	teamAbbrev: {
		type: String,
		required: true,
	},
})

export const Player = models.Player || model<TPlayer>('Player', PlayerSchema)
