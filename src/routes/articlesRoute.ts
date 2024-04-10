import express from 'express'
import { guardPage } from '../middleware/guardPage'
import { validate } from '../middleware/zodValidate'
import { CreateArticleData, CreateArticleSchema } from '../lib/zodSchemas'
import { createArticle, getArticleById } from '../db/repositories/articleRepository'

const router = express.Router()

// GET /articles/new - render new article form
router.get('/new', guardPage(false), (req, res) => {
    res.render('new-article')
})

// GET /articles/:id - render article details with comments
router.get('/:id', async (req, res) => {
    const articleId = req.params.id

    const article = await getArticleById(articleId)
    console.log(article)

    if (!article) {
        res.redirect('/')
    }

    res.render('article', {
        article: article,
    })
})

// POST /articles - create a new article
router.post('/', guardPage(false), validate({ body: CreateArticleSchema }), async (req, res) => {
    const data = req.body as CreateArticleData

    const article = await createArticle(data)
    res.status(201).json(article)
})

export default router
