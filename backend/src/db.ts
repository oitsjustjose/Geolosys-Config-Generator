import mongoose from 'mongoose'

export default async () => {
    await mongoose.connect(`mongodb://${process.env.MONGO_URI}/GeolosysConfigGen`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}