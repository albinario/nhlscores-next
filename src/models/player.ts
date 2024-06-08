import { model, models, Schema } from 'mongoose'
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
		required: true,
		maxlength: 1,
	},
	teamAbbrev: {
		type: String,
		required: true,
	},
})

export const Player = models.Player || model<TPlayer>('Player', PlayerSchema)
