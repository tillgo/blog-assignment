import { Request } from 'express'
import { Article } from '../db/models/article'
import { BadRequestProblem, ForbiddenProblem } from './errors'

/**
 * Helper function to check if a user may edit an article or comment
 *
 * @param userId The ID of the current user
 * @param authorId The ID of the author of the article or comment
 * @param isAdmin Whether the current user is an admin
 * @returns Whether the user may edit the article or comment
 */
export const mayEdit = (
    userId: string | undefined,
    authorId: string,
    isAdmin: boolean | undefined
) => {
    if (!userId) {
        return false
    }
    return userId == authorId || isAdmin === true
}

/**
 * Guard function to check if a user may edit an article
 *
 * @param req Request object
 * @param article The article to check
 *
 * @throws BadRequestProblem if the article is not found
 * @throws ForbiddenProblem if the user may not edit the article
 */
export const guardEditArticle = (req: Request, article: Article | null) => {
    if (!article) {
        throw new BadRequestProblem('Article not found')
    } else if (!mayEdit(req.userId!, article.authorId.toString(), req.isAdmin!)) {
        throw new ForbiddenProblem()
    }
}

/**
 * Guard function to check if a user may edit a comment
 *
 * @param req Request object
 * @param article The article to check
 * @param commentId The ID of the comment to check
 *
 * @throws BadRequestProblem if the article or comment is not found
 * @throws ForbiddenProblem if the user may not edit the comment
 */
export const guardEditComment = (req: Request, article: Article | null, commentId: string) => {
    if (!article) {
        throw new BadRequestProblem('Article / Comment not found')
    } else {
        const comment = article.comments.find((c) => c._id.toString() === commentId)
        if (!comment) {
            throw new BadRequestProblem('Comment not found')
        } else if (!mayEdit(req.userId!, comment.authorId.toString(), req.isAdmin!)) {
            throw new ForbiddenProblem()
        }
    }
}
