import mongoose, { Model } from 'mongoose'
import { getUserModel, User } from './user'

const { SchemaTypes } = mongoose
const { String, Date: MDate, ObjectId } = SchemaTypes

export type Comment = {
    _id: mongoose.Types.ObjectId
    author: User
    body: string

    createdAt: Date
    lastEditedAt?: Date
}

export type Article = {
    _id: string
    author: User
    title: string
    subtitle?: string
    category?: string
    timeToRead?: number
    body: string
    image?: string

    comments: Comment[]

    createdAt: Date
    lastEditedAt?: Date
}

const COMMENT_SCHEMA = new mongoose.Schema({
    authorId: { type: ObjectId, required: true, ref: getUserModel },
    body: { type: String, required: true },

    createdAt: { type: MDate, required: true, default: Date.now },
    lastEditedAt: { type: MDate },
})
COMMENT_SCHEMA.virtual('author', {
    ref: getUserModel,
    localField: 'authorId',
    foreignField: '_id',
    justOne: true,
})

const ARTICLE_SCHEMA = new mongoose.Schema({
    authorId: { type: ObjectId, required: true, ref: getUserModel },
    title: { type: String, required: true },
    subtitle: { type: String },
    category: { type: String },
    timeToRead: { type: Number },
    body: { type: String, required: true },
    image: { type: String },

    comments: [{ type: COMMENT_SCHEMA, required: true, default: [] }],

    createdAt: { type: MDate, required: true, default: Date.now },
    lastEditedAt: { type: MDate },
})
ARTICLE_SCHEMA.virtual('author', {
    ref: getUserModel,
    localField: 'authorId',
    foreignField: '_id',
    justOne: true,
})

export type ArticleDocument = mongoose.Document & Article

/**
 * Get the model for the article collection
 */
export const getArticleModel = (): Model<ArticleDocument> =>
    mongoose.model<ArticleDocument>('Article', ARTICLE_SCHEMA, 'article')
