import { Article, Comment, getArticleModel } from '../models/article'
import { SetArticleData, SetCommentData, UpdateCommentData } from '../../lib/zodSchemas'

export const createArticle = async (data: SetArticleData): Promise<Article> => {
    return await new (getArticleModel())(data).save()
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
    data: SetArticleData
): Promise<Article | null> => {
    return await getArticleModel()
        .findByIdAndUpdate(articleId, { ...data, lastEditedAt: Date.now() }, { new: true })
        .exec()
}

export const createComment = async (articleId: string, data: SetCommentData) => {
    await getArticleModel()
        .findByIdAndUpdate(articleId, { $push: { comments: data } })
        .exec()
}

export const editComment = async (commentId: string, data: UpdateCommentData) => {
    // construct the update operator by hand, to allow for partial updates
    const updateOperator = {
        $set: {} as Record<string, any>,
    }
    const updateData = { ...data, lastEditedAt: Date.now() } // update lastEditedAt
    Object.entries(updateData).forEach(([key, value]) => {
        updateOperator.$set[`comments.$.${key}`] = value
    })

    await getArticleModel().findOneAndUpdate({ 'comments._id': commentId }, updateOperator).exec()
}

export const deleteComment = async (commentId: string) => {
    await getArticleModel()
        .findOneAndUpdate(
            { 'comments._id': commentId },
            { $pull: { comments: { _id: commentId } } }
        )
        .exec()
}
