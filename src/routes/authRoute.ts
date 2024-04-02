import { validate } from '../middleware/zodValidate'
import express from 'express'
import bcrypt from 'bcrypt'
import { LoginData, LoginSchema } from '../lib/zodSchemas'
import { createSecretToken } from '../lib/jwtUtils'
import { createUser, getUserByName } from '../db/repositories/userRepository'

const router = express.Router()

router.post('/sign-up', validate({ body: LoginSchema }), async (req, res) => {
    const data = req.body as LoginData

    try {
        const existingUser = await getUserByName(data.username)
        if (existingUser) {
            return res.status(400).json({
                message: 'Username is already taken',
            })
        }

        bcrypt.hash(data.password, 10, async function (err, hash) {
            if (err) {
                return res.status(400).json({
                    message: 'Failed to hash password',
                })
            }

            const user = await createUser({ username: data.username, passwordHash: hash })

            const token = createSecretToken(user.id, user.isAdmin)

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
            })

            res.redirect('/')
        })
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Sign-up failed',
        })
    }
})

router.post('/sign-in', validate({ body: LoginSchema }), async (req, res) => {
    const data = req.body as LoginData

    try {
        const user = await getUserByName(data.username)
        if (!user) {
            return res.status(400).json({
                message: 'Incorrect username or password',
            })
        }

        const isPasswordCorrect = await bcrypt.compare(data.password, user.passwordHash)
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: 'Incorrect username or password',
            })
        }

        const token = createSecretToken(user.id, user.isAdmin)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        })

        res.redirect('/')
    } catch (error) {
        res.status(500).json({
            error: error,
            message: 'Login failed',
        })
    }
})

router.delete('/logout', async (req, res, next) => {
    res.clearCookie('token')
    res.status(200).json({ message: 'Logged out' })
})

export default router
