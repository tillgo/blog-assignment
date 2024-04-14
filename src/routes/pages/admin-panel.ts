import express from 'express'
import { findAuthorsByFilter, getUserById } from '../../db/repositories/userRepository'
import { getArticles } from '../../db/repositories/articleRepository'

const router = express.Router()

router.get('/', async (req, res) => {
    const userSearch = req.query.usersearch as string | undefined
    const users = await findAuthorsByFilter(userSearch)

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const articles = await getArticles(0, undefined, undefined, twentyFourHoursAgo)

    res.render('admin-panel', { articles, users })
})

router.get('/users/new', async (req, res) => {
    res.render('edit-user')
})

router.get('/users/:userId/edit', async (req, res) => {
    const userId = req.params.userId
    const user = await getUserById(userId)

    if (!user) {
        return res.redirect('/admin-panel')
    }

    res.render('edit-user', { user, isEdit: true })
})

export default router
