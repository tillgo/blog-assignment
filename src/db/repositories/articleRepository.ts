import { Article, ArticleDocument, getArticleModel } from '../models/article'
import { SearchArticlesFilterData, SetArticleData, SetCommentData } from '../../lib/zodSchemas'
import { getUserModel, User } from '../models/user'
import { FilterQuery, PipelineStage } from 'mongoose'
import { escapeForRegex } from '../../lib/regexUtils'

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
 * @returns The article containing the comment, or null if not found
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
 * List articles, sorted by creation date
 * Default limit is 100.
 *
 * @param limit - The maximum number of articles to return
 * @param filter - The filter to apply to the search
 * @param possibleAuthors - A list of possible authors for filtering
 * @param createdAfter - The date to filter articles created after
 * @returns list of articles
 */
export const getArticles = async (
    limit: number = 0, // default limit is unlimited
    filter?: SearchArticlesFilterData,
    possibleAuthors?: User[],
    createdAfter?: Date
): Promise<Article[]> => {
    const filterQuery = {} as FilterQuery<ArticleDocument>

    if (filter?.tag) {
        const tag = new RegExp(escapeForRegex(filter?.tag), 'i')
        filterQuery.tags = { $regex: tag }
    }
    if (filter?.search) {
        const search = new RegExp(escapeForRegex(filter?.search), 'i')
        filterQuery.title = { $regex: search }
    }

    if (possibleAuthors) {
        filterQuery.authorId = { $in: possibleAuthors.map((author) => author._id) }
    }
    if (createdAfter) {
        filterQuery.createdAt = { $gte: createdAfter }
    }

    return await getArticleModel()
        .find(filterQuery)
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('author')
        .lean()
        .exec()
}

/**
 * Delete all articles for a user
 * @param userId - The ID of the user to delete articles for
 * @returns The number of articles deleted
 */
export const deleteArticlesForUser = async (userId: string) => {
    return await getArticleModel().deleteMany({ authorId: userId }).exec()
}

export const deleteCommentsForUser = async (userId: string) => {
    return await getArticleModel()
        .updateMany({ 'comments.authorId': userId }, { $pull: { comments: { authorId: userId } } })
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
 * Delete an article
 *
 * @param articleId - The ID of the article to delete
 */
export const deleteArticle = async (articleId: string) => {
    return await getArticleModel().findByIdAndDelete(articleId).exec()
}

/**
 * Create a new comment on an article
 *
 * @param articleId - The ID of the article to delete
 * @param authorId - The ID of the author of the comment
 * @param data - The data for the new comment
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
