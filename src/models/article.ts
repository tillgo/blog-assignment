import mongoose, { Model } from 'mongoose'
import { getUserModel } from './user'

const { SchemaTypes } = mongoose
const { String, Date: MDate, ObjectId } = SchemaTypes

export type Comment = {
    _id: string
    authorId: string
    body: string

    createdAt: Date
    lastEdited?: Date
}

export type Article = {
    _id: string
    authorId: string
    title: string
    body: string

    comments: Comment[]

    createdAt: Date
    lastEdited?: Date
}

const COMMENT_SCHEMA = new mongoose.Schema({
    authorId: { type: ObjectId, required: true, ref: getUserModel },
    body: { type: String, required: true },

    createdAt: { type: MDate, required: true, default: Date.now },
    lastEdited: { type: MDate },
})

const ARTICLE_SCHEMA = new mongoose.Schema({
    authorId: { type: ObjectId, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },

    comments: [COMMENT_SCHEMA],

    createdAt: { type: MDate, required: true, default: Date.now },
    lastEdited: { type: MDate },
})

export type ArticleDocument = mongoose.Document & Article

export const getArticleModel = (): Model<ArticleDocument> =>
    mongoose.model<ArticleDocument>('Article', ARTICLE_SCHEMA, 'article')
