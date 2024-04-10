import { validate } from '../middleware/zodValidate'
import express from 'express'
import bcrypt from 'bcrypt'
import { LoginData, LoginSchema } from '../lib/zodSchemas'
import { createSecretToken } from '../lib/jwtUtils'
import { createUser, getUserByName } from '../db/repositories/userRepository'
import { BadRequestProblem } from '../lib/errors'

const router = express.Router()

// POST /auth/sign-up - Sign up a new user
router.post('/sign-up', validate({ body: LoginSchema }), async (req, res) => {
    const data = req.body as LoginData

    const existingUser = await getUserByName(data.username)
    if (existingUser) {
        throw new BadRequestProblem('Username already exists')
    }

    const hash = bcrypt.hashSync(data.password, 10)
    const user = await createUser({ username: data.username, passwordHash: hash })

    const token = createSecretToken(user._id, user.isAdmin)

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    })

    res.status(201).json({ message: 'Signed up' })
})

// POST /auth/sign-in - Sign in a user
router.post('/sign-in', validate({ body: LoginSchema }), async (req, res) => {
    const data = req.body as LoginData

    const user = await getUserByName(data.username)
    if (!user) {
        throw new BadRequestProblem('Incorrect username or password')
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.passwordHash)
    if (!isPasswordCorrect) {
        throw new BadRequestProblem('Incorrect username or password')
    }

    const token = createSecretToken(user._id, user.isAdmin)

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    })

    res.status(200).json({ message: 'Signed in' })
})

// DELETE /auth/logout - Log out a user
router.delete('/logout', async (req, res, next) => {
    res.clearCookie('token')
    res.status(200).json({ message: 'Logged out' })
})

export default router
