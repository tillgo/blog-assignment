import express from 'express'
import { guardPage } from '../../middleware/guardPage'
import blogPages from './blog'
import { getArticles } from '../../db/repositories/articleRepository'

const router = express.Router()

router.get('/', async (req, res) => {
    const articles = await getArticles(10)

    res.render('home', { articles })
})

router.get('/sign-in', (req, res) => {
    res.render('sign-in')
})

router.get('/sign-up', (req, res) => {
    res.render('sign-up')
})

router.get('/admin-panel', guardPage(true), (req, res) => {
    res.render('admin-panel')
})

// Use the blogPages router for all /blog routes
router.use('/blog', blogPages)

export default router
