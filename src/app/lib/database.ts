import mongoose from 'mongoose'

export const connectMongo = async (): Promise<boolean> => {
	if (mongoose.connection.readyState === 1) return true

	const uri = process.env.MONGODB_URI

	if (!uri || uri.trim() === '') {
		console.error('Error: MONGODB_URI is not defined or empty.')

		return false
	}

	try {
		await mongoose.connect(uri, {
			maxPoolSize: 10,
			serverSelectionTimeoutMS: 5000,
			socketTimeoutMS: 45000,
		})

		return true
	} catch (error) {
		console.error('Error connecting to MongoDB: ', error)

		return false
	}
}
