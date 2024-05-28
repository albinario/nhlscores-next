import { model, models, Schema } from 'mongoose'

const PlayerSchema: Schema = new Schema<TPlayerPicked>({
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

export const Player =
	models.Player || model<TPlayerPicked>('Player', PlayerSchema)
