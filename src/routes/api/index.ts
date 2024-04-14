import express from 'express'
import authRoute from './auth'
import articlesRoute from './articles'
import commentsRoute from './comments'
import usersRoute from './users'

const router = express.Router()

router.use('/auth', authRoute)

router.use('/articles', articlesRoute)

router.use('/comments', commentsRoute)

router.use('/users', usersRoute)

export default router
