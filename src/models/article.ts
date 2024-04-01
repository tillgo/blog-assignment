import mongoose, { Model } from 'mongoose'

const { SchemaTypes } = mongoose
const { String, Date: MDate, ObjectId } = SchemaTypes

export type Article = {
    _id: string
    title: string
    content: string
    authorId: string

    createdAt: Date
    editedAt: Date | null
}

const SCHEMA = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: ObjectId, required: true },

    createdAt: { type: MDate, required: true, default: Date.now },
    editedAt: { type: MDate },
})

type ArticleEntity = Omit<Article, '_id'> & { _id: any }
export type ArticleDocument = mongoose.Document & ArticleEntity

export const getArticleDocument = (): Model<ArticleDocument> =>
    mongoose.model<ArticleDocument>('Article', SCHEMA, 'article')
