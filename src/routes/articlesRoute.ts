import express, { Request } from 'express'
import { guardPage } from '../middleware/guardPage'
import { validate } from '../middleware/zodValidate'
import {
    SetArticleData,
    SetArticleSchema,
    SetCommentData,
    SetCommentSchema,
} from '../lib/zodSchemas'
import {
    createArticle,
    createComment,
    getArticleById,
    updateArticle,
} from '../db/repositories/articleRepository'
import { BadRequestProblem, ForbiddenProblem } from '../lib/errors'

const router = express.Router()

// POST /api/articles - create a new article
router.post(
    '/',
    guardPage(false),
    validate({ body: SetArticleSchema }),
    async (req: Request, res) => {
        const data = req.body as SetArticleData

        if (req.userId !== data.authorId && !req.isAdmin) {
            throw new ForbiddenProblem('You are not allowed to create an article for another user')
        }

        const article = await createArticle(data)
        res.status(201).json({ article })
    }
)

// PUT /api/articles/:id - update an article
router.put(
    '/:articleId',
    guardPage(false),
    validate({ body: SetArticleSchema }),
    async (req: Request, res) => {
        const data = req.body as SetArticleData
        const articleId = req.params.articleId

        const article = await getArticleById(articleId)
        if (!article) {
            throw new BadRequestProblem('Article not found')
        } else if (req.userId !== article.author._id.toString() && !req.isAdmin) {
            throw new ForbiddenProblem('You are not allowed to update this article')
        }

        const newArticle = await updateArticle(articleId, data)
        res.status(200).json({ article: newArticle })
    }
)

// POST /api/articles/:articleId/comments - create a new comment
router.post(
    '/:articleId/comments',
    guardPage(false),
    validate({ body: SetCommentSchema }),
    async (req: Request, res) => {
        const articleId = req.params.articleId
        const comment = req.body as SetCommentData

        if (req.userId !== comment.authorId && !req.isAdmin) {
            throw new ForbiddenProblem('You are not allowed to create a comment for another user')
        }

        await createComment(articleId, comment)
        res.status(201).json({ message: 'Comment created' })
    }
)

export default router
