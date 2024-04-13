import express, { Request } from 'express'
import { validate } from '../../middleware/zodValidate'
import {
    SetArticleData,
    SetArticleSchema,
    SetCommentData,
    SetCommentSchema,
} from '../../lib/zodSchemas'
import {
    createArticle,
    createComment,
    deleteArticle,
    getArticleById,
    updateArticle,
} from '../../db/repositories/articleRepository'
import { ForbiddenProblem } from '../../lib/errors'
import { authorize } from '../../middleware/authorize'
import { guardEditArticle, mayEdit } from '../../lib/guard'

const router = express.Router()

// POST /api/articles - create a new article
router.post(
    '/',
    authorize(false),
    validate({ body: SetArticleSchema }),
    async (req: Request, res) => {
        const data = req.body as SetArticleData

        if (!mayEdit(req.userId!, data.authorId, req.isAdmin!)) {
            throw new ForbiddenProblem()
        }

        const article = await createArticle(data)
        res.status(201).json(article)
    }
)

// PUT /api/articles/:id - update an article
router.put(
    '/:articleId',
    authorize(false),
    validate({ body: SetArticleSchema }),
    async (req: Request, res) => {
        const data = req.body as SetArticleData
        const articleId = req.params.articleId

        const article = await getArticleById(articleId)
        guardEditArticle(req, article)

        const newArticle = await updateArticle(articleId, data)
        res.status(200).json(newArticle)
    }
)

// DELETE /api/articles/:articleId - delete an article
router.delete('/:articleId', authorize(false), async (req: Request, res) => {
    const articleId = req.params.articleId

    const article = await getArticleById(articleId)
    guardEditArticle(req, article)

    await deleteArticle(articleId)
    res.status(200).json({ message: 'Article deleted' })
})

// POST /api/articles/:articleId/comments - create a new comment
router.post(
    '/:articleId/comments',
    authorize(false),
    validate({ body: SetCommentSchema }),
    async (req: Request, res) => {
        const articleId = req.params.articleId
        const data = req.body as SetCommentData

        await createComment(articleId, req.userId!, data)
        res.status(201).json({ message: 'Comment created' })
    }
)

export default router
