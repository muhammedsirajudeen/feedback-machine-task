import mongoose from 'mongoose'
import { RouteError } from './Error'
import { envConfig } from '../config/envConfig'

export async function connectToMongo() {
    try {
        await mongoose.connect(envConfig.MONGODB_URI)
        console.log('Connected to mongodb')
    } catch (error) {
        throw new RouteError('Error connecting to mongo', 500)
    }
}