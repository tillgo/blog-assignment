import express, { Request } from 'express'
import { validate } from '../../middleware/zodValidate'
import { SetCommentData, SetCommentSchema } from '../../lib/zodSchemas'
import {
    deleteComment,
    editComment,
    getArticleByComment,
} from '../../db/repositories/articleRepository'
import { BadRequestProblem, ForbiddenProblem } from '../../lib/errors'
import { authorize } from '../../middleware/authorize'

const router = express.Router()

// POST /api/comments/:commentId - create a new article
router.put(
    '/:commentId',
    authorize(false),
    validate({ body: SetCommentSchema }),
    async (req: Request, res) => {
        const commentId = req.params.commentId
        const data = req.body as SetCommentData

        const article = await getArticleByComment(commentId)
        if (!article) {
            throw new BadRequestProblem('Article / Comment not found')
        } else {
            const comment = article.comments.find((c) => c._id.toString() === commentId)
            if (!comment) {
                throw new BadRequestProblem('Comment not found')
            } else if (req.userId !== comment.author._id.toString() && !req.isAdmin) {
                throw new ForbiddenProblem()
            }
        }

        await editComment(commentId, data)
        res.status(200).json({ message: 'Comment edited' })
    }
)

// DELETE /api/comments/:commentId - delete a comment
router.delete('/:commentId', authorize(false), async (req: Request, res) => {
    const commentId = req.params.commentId

    const article = await getArticleByComment(commentId)
    if (!article) {
        throw new BadRequestProblem('Article / Comment not found')
    } else {
        const comment = article.comments.find((c) => c._id.toString() === commentId)
        if (!comment) {
            throw new BadRequestProblem('Comment not found')
        } else if (req.userId !== comment.author._id.toString() && !req.isAdmin) {
            throw new ForbiddenProblem()
        }
    }

    await deleteComment(commentId)
    res.status(200).json({ message: 'Comment deleted' })
})

export default router
