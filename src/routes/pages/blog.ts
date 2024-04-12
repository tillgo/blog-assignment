import express, { Request } from 'express'
import { guardPage } from '../../middleware/guardPage'
import { getArticleById, getArticles } from '../../db/repositories/articleRepository'

const router = express.Router()

// GET / - render blog page
router.get('/', async (req: Request, res) => {
    const articles = await getArticles()

    res.render('blog', { articles })
})

// GET /blog/new - render new article form
router.get('/new', guardPage(false), (req, res) => {
    res.render('new-article')
})

// GET /blog/:articleId - render article details with comments
router.get('/:articleId', async (req, res) => {
    const articleId = req.params.articleId

    const article = await getArticleById(articleId)

    if (!article) {
        res.redirect('/')
    }

    res.render('article', {
        article: article,
    })
})

export default router
