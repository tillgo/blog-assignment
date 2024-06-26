import express from 'express'
import { guardPage } from '../../middleware/guardPage'
import blogPages from './blog'
import { getArticles } from '../../db/repositories/articleRepository'
import adminPanel from './admin-panel'

const router = express.Router()

// GET / - render home page
router.get('/', async (req, res) => {
    const articles = await getArticles(10)

    res.render('home', { articles })
})

// GET /sign-in - render sign-in page
router.get('/sign-in', (req, res) => {
    res.render('sign-in')
})

// GET /sign-up - render sign-up page
router.get('/sign-up', (req, res) => {
    res.render('sign-up')
})

// Use the adminPanel router for all /admin-panel routes
router.use('/admin-panel', guardPage(true), adminPanel)
// Use the blogPages router for all /blog routes
router.use('/blog', blogPages)

export default router
