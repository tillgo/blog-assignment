import mongoose, { Model } from 'mongoose'
import { getUserModel } from './user'

const { SchemaTypes } = mongoose
const { String, Date: MDate, ObjectId } = SchemaTypes

export type Comment = {
    _id: string
    authorId: string
    body: string

    createdAt: Date
    lastEditedAt?: Date
}

export type Article = {
    _id: string
    authorId: string
    title: string
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

const ARTICLE_SCHEMA = new mongoose.Schema({
    authorId: { type: ObjectId, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },

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
