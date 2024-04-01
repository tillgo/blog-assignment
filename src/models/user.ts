import mongoose, { Model } from 'mongoose'

const { SchemaTypes } = mongoose
const { String, Date: MDate } = SchemaTypes

export type User = {
    _id: string
    username: string
    email: string
    firstName?: string
    lastName?: string

    passwordHash: string

    createdAt: Date
}

const SCHEMA = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },

    passwordHash: { type: String, required: true },

    createdAt: { type: MDate, required: true, default: Date.now },
})

export type UserDocument = mongoose.Document & User

export const getUserModel = (): Model<UserDocument> =>
    mongoose.model<UserDocument>('User', SCHEMA, 'user')
