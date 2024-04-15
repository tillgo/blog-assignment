import express from 'express'
import { findAuthorsByFilter, getUserById } from '../../db/repositories/userRepository'
import { getArticles } from '../../db/repositories/articleRepository'

const router = express.Router()

// GET - render admin panel
router.get('/', async (req, res) => {
    const userSearch = req.query.usersearch as string | undefined
    const lastFive = req.query.lastFive as string | undefined
    const users = await findAuthorsByFilter(userSearch)

    const isLastFive = lastFive === 'true'

    // when lastFive is true, we want to get the last 5 articles, otherwise all articles from the last 24 hours
    const timeCutoff = isLastFive ? undefined : new Date(Date.now() - 24 * 60 * 60 * 1000)
    const limit = isLastFive ? 5 : 0

    const articles = await getArticles(limit, undefined, undefined, timeCutoff)

    res.render('admin-panel', { articles, users })
})

// GET - render new user form
router.get('/users/new', async (req, res) => {
    res.render('edit-user')
})

// GET - render edit user form
router.get('/users/:userId/edit', async (req, res) => {
    const userId = req.params.userId
    const user = await getUserById(userId)

    if (!user) {
        return res.redirect('/admin-panel')
    }

    res.render('edit-user', { user, isEdit: true })
})

export default router
