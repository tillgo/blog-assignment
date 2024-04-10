import mongoose, { Model } from 'mongoose'

const { SchemaTypes } = mongoose
const { String, Date: MDate } = SchemaTypes

export type User = {
    _id: mongoose.Types.ObjectId
    username: string
    firstName?: string
    lastName?: string

    passwordHash: string
    isAdmin: boolean

    createdAt: Date
}
export type NewUser = Omit<User, '_id' | 'createdAt' | 'isAdmin'>

const SCHEMA = new mongoose.Schema(
    {
        username: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },

        passwordHash: { type: String, required: true },
        isAdmin: { type: Boolean, required: true, default: false },

        createdAt: { type: MDate, required: true, default: Date.now },
    },
    // Sort usernames in a case-insensitive manner
    {
        collation: { locale: 'en', strength: 2 },
    }
)

export type UserDocument = mongoose.Document & User

/**
 * Get the model for the user collection
 */
export const getUserModel = (): Model<UserDocument> =>
    mongoose.model<UserDocument>('User', SCHEMA, 'user')
