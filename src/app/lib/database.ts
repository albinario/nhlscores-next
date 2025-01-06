import mongoose from 'mongoose'

export const connectMongo = async (): Promise<boolean> => {
	if (mongoose.connection.readyState) return true

	const uri = process.env.MONGODB_URI

	if (!uri) {
		console.error('Error: MONGODB_URI is not defined.')

		return false
	}

	try {
		await mongoose.connect(uri)

		return true
	} catch (error) {
		console.error('Error connecting to MongoDB: ', error)

		return false
	}
}
