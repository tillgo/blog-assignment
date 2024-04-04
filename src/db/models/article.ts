import mongoose, { Model } from 'mongoose'
import { getUserModel, User } from './user'

const { SchemaTypes } = mongoose
const { String, Date: MDate, ObjectId } = SchemaTypes

export type Comment = {
    _id: string
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

const ARTICLE_SCHEMA = new mongoose.Schema({
    authorId: { type: ObjectId, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    body: { type: String, required: true },
    image: { type: String },

    comments: [{ type: COMMENT_SCHEMA, required: true, default: [] }],

    createdAt: { type: MDate, required: true, default: Date.now },
    lastEditedAt: { type: MDate },
})

export type ArticleDocument = mongoose.Document & Article

/**
 * Get the model for the article collection
 */
export const getArticleModel = (): Model<ArticleDocument> =>
    mongoose.model<ArticleDocument>('Article', ARTICLE_SCHEMA, 'article')
