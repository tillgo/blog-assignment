import mongoose, { Model } from 'mongoose'
import { getUserModel, User } from './user'

const { SchemaTypes } = mongoose
const { String, Date: MDate, ObjectId, Number } = SchemaTypes

export type Comment = {
    _id: mongoose.Types.ObjectId
    authorId: mongoose.Types.ObjectId
    author?: User
    body: string

    createdAt: Date
    lastEditedAt?: Date
}

export type Article = {
    _id: mongoose.Types.ObjectId
    authorId: mongoose.Types.ObjectId
    author?: User
    title: string
    subtitle?: string
    tags: string[]
    timeToRead?: number
    image?: string
    body: string

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
    tags: [{ type: String, required: true, default: [] }],
    timeToRead: { type: Number },
    image: { type: String },
    body: { type: String, required: true },

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
