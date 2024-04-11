import { Article, getArticleModel } from '../models/article'
import { SetArticleData, SetCommentData } from '../../lib/zodSchemas'

/**
 * Create a new article
 *
 * @param data - The data for the new article
 * @returns The newly created article
 */
export const createArticle = async (data: SetArticleData): Promise<Article> => {
    return await new (getArticleModel())(data).save()
}

/**
 * Get an article by ID
 *
 * @param articleId - The ID of the article to fetch
 * @returns The article, or null if not found
 */
export const getArticleById = async (articleId: string): Promise<Article | null> => {
    return await getArticleModel()
        .findById(articleId)
        .populate('author')
        .populate('comments.author')
        .lean()
        .exec()
}

/**
 * Get an article by a comment ID
 *
 * @param commentId - The ID of the comment to search for
 * @returns All articles
 */
export const getArticleByComment = async (commentId: string): Promise<Article | null> => {
    return await getArticleModel()
        .findOne({ 'comments._id': commentId })
        .populate('author')
        .populate('comments.author')
        .lean()
        .exec()
}

/**
 * Update an article
 *
 * @param articleId - The ID of the article to update
 * @param data - The new data for the article
 * @returns The updated article, or null if not found
 */
export const updateArticle = async (
    articleId: string,
    data: SetArticleData
): Promise<Article | null> => {
    return await getArticleModel()
        .findByIdAndUpdate(articleId, { ...data, lastEditedAt: Date.now() }, { new: true })
        .exec()
}

/**
 * Create a new comment on an article
 *
 * @param articleId - The ID of the article to delete
 */
export const createComment = async (articleId: string, authorId: string, data: SetCommentData) => {
    await getArticleModel()
        .findByIdAndUpdate(articleId, { $push: { comments: { ...data, authorId } } })
        .exec()
}

/**
 * Edit a comment on an article
 *
 * @param commentId - The ID of the comment to edit
 * @param data - The new data for the comment
 */
export const editComment = async (commentId: string, data: SetCommentData) => {
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

/**
 * Delete a comment from an article
 *
 * @param commentId - The ID of the comment to delete
 */
export const deleteComment = async (commentId: string) => {
    await getArticleModel()
        .findOneAndUpdate(
            { 'comments._id': commentId },
            { $pull: { comments: { _id: commentId } } }
        )
        .exec()
}
