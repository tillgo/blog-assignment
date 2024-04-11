import { Article, getArticleModel } from '../models/article'
import { SetArticleData, SetCommentData } from '../../lib/zodSchemas'

export const createArticle = async (article: SetArticleData): Promise<Article> => {
    return await new (getArticleModel())(article).save()
}

export const getArticleById = async (articleId: string): Promise<Article | null> => {
    return await getArticleModel()
        .findById(articleId)
        .populate('author')
        .populate('comments.author')
        .lean()
        .exec()
}

export const getArticleByComment = async (commentId: string): Promise<Article | null> => {
    return await getArticleModel()
        .findOne({ 'comments._id': commentId })
        .populate('author')
        .populate('comments.author')
        .lean()
        .exec()
}

export const updateArticle = async (
    articleId: string,
    article: SetArticleData
): Promise<Article | null> => {
    return await getArticleModel()
        .findByIdAndUpdate(articleId, { ...article, lastEditedAt: Date.now() }, { new: true })
        .exec()
}

export const createComment = async (articleId: string, comment: SetCommentData) => {
    await getArticleModel()
        .findByIdAndUpdate(articleId, { $push: { comments: comment } })
        .exec()
}

export const editComment = async (commentId: string, comment: SetCommentData) => {
    await getArticleModel()
        .findOneAndUpdate(
            { 'comments._id': commentId },
            { $push: { 'comments.$': { ...comment, lastEditedAt: Date.now() } } }
        )
        .exec()
}

export const deleteComment = async (commentId: string) => {
    await getArticleModel()
        .findOneAndUpdate(
            { 'comments._id': commentId },
            { $pull: { comments: { _id: commentId } } }
        )
        .exec()
}
