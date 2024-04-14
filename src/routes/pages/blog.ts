import express, { Request } from 'express'
import { guardPage } from '../../middleware/guardPage'
import { getArticleById, getArticles } from '../../db/repositories/articleRepository'
import { validate } from '../../middleware/zodValidate'
import { SearchArticlesFilterData, SearchArticlesFilterSchema } from '../../lib/zodSchemas'
import { findAuthorsByFilter } from '../../db/repositories/userRepository'

const router = express.Router()

// GET / - render blog page
router.get('/', validate({ query: SearchArticlesFilterSchema }), async (req: Request, res) => {
    const filters = req.query as SearchArticlesFilterData

    // decode URI components in filters
    Object.entries(filters).forEach(([key, value]) => {
        filters[key as keyof SearchArticlesFilterData] = value
            ? decodeURIComponent(value)
            : undefined
    })

    const possibleAuthors = await findAuthorsByFilter(filters.author)
    const articles = await getArticles(100, filters, possibleAuthors)

    res.render('blog', { articles })
})

// GET /blog/new - render new article form
router.get('/new', guardPage(false), (req, res) => {
    res.render('edit-article')
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

// GET /blog/:articleId/edit - render edit article form
router.get('/:articleId/edit', guardPage(false), async (req: Request, res) => {
    const articleId = req.params.articleId

    const article = await getArticleById(articleId)

    if (!article) {
        res.redirect('/')
    } else if (req.userId !== article.authorId.toString() && !req.isAdmin) {
        res.redirect('/') // maybe handle this differently in the future
    }

    res.render('edit-article', {
        article,
        isEdit: true,
    })
})

export default router
