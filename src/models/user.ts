import mongoose, { Model } from 'mongoose'

const { SchemaTypes } = mongoose
const { String, Date: MDate } = SchemaTypes

export type User = {
    _id: string
    username: string
    email: string
    firstName: string | null
    lastName: string | null

    passwordHash: string
    salt: string

    createdAt: Date
}

const SCHEMA = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },

    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },

    createdAt: { type: MDate, required: true },
})

type UserEntity = Omit<User, '_id'> & { _id: any }
export type UserDocument = mongoose.Document & UserEntity

export const getUserModel = (): Model<UserDocument> =>
    mongoose.model<UserDocument>('User', SCHEMA, 'user')
