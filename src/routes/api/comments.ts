import express, { Request } from 'express'
import { validate } from '../../middleware/zodValidate'
import { SetCommentData, SetCommentSchema } from '../../lib/zodSchemas'
import {
    deleteComment,
    editComment,
    getArticleByComment,
} from '../../db/repositories/articleRepository'
import { authorize } from '../../middleware/authorize'
import { guardEditComment } from '../../lib/guard'

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
        guardEditComment(req, article, commentId)

        await editComment(commentId, data)
        res.status(200).json({ message: 'Comment edited' })
    }
)

// DELETE /api/comments/:commentId - delete a comment
router.delete('/:commentId', authorize(false), async (req: Request, res) => {
    const commentId = req.params.commentId

    const article = await getArticleByComment(commentId)
    guardEditComment(req, article, commentId)

    await deleteComment(commentId)
    res.status(200).json({ message: 'Comment deleted' })
})

export default router
