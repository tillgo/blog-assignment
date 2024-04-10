import express from 'express'
import { guardPage } from '../middleware/guardPage'

const router = express.Router()

// GET /articles/new - render new article form
router.get('/new', guardPage(false), (req, res) => {
    res.render('new-article')
})

// GET /articles/:id - render article details with comments
router.get('/:id', (req, res) => {
    res.render('article', {
        article: {
            _id: '1',
            title: 'This is the very cool and fancy Article Title',
            subtitle: 'This is the very cool and fancy Article Subtitle',
            authorId: '660b024fbc58bf0f6c058d3b',
            author: {
                _id: '660b024fbc58bf0f6c058d3b',
                username: 'Till',
                isAdmin: false,
                createdAt: new Date(2024, 1, 1),
            },
            body: 'This is the body of the article. It is very cool and fancy',

            comments: [
                {
                    _id: 'comment-1',
                    body: 'This is a very cool and fancy comment',
                    author: {
                        _id: '660b024fbc58bf0f6c058d3b',
                        username: 'Till',
                        isAdmin: true,
                        createdAt: new Date(2024, 1, 1),
                    },
                    createdAt: new Date(2024, 2, 28, 19, 36, 0, 0),
                },
                {
                    _id: 'comment-2',
                    body: 'This is another very cool and fancy comment',
                    author: {
                        _id: '660c6c9f612ffbd5db08a79b',
                        username: 'TestUser',
                        isAdmin: false,
                        createdAt: new Date(2024, 1, 1),
                    },
                    createdAt: new Date(2024, 1, 1),
                    lastEditedAt: new Date(2024, 2, 1),
                },
                {
                    _id: 'comment-3',
                    body: 'This is another very cool and fancy comment',
                    author: {
                        _id: '660b024fbc58bf0f6c058d3b',
                        username: 'Till',
                        isAdmin: true,
                        createdAt: new Date(2024, 2, 1),
                    },
                    createdAt: new Date(2024, 1, 1),
                },
            ],
            createdAt: new Date(2024, 1, 1),
        },
    })
})
export default router
