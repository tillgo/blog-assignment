import express from 'express'
import { guardPage } from '../middleware/guardPage'
import { validate } from '../middleware/zodValidate'
import { CreateArticleData, CreateArticleSchema } from '../lib/zodSchemas'
import { createArticle } from '../db/repositories/articleRepository'

const router = express.Router()

// POST /api/articles - create a new article
router.post('/', guardPage(false), validate({ body: CreateArticleSchema }), async (req, res) => {
    const data = req.body as CreateArticleData

    const article = await createArticle(data)
    res.status(201).json(article)
})

export default router
