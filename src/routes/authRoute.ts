import { validate } from '../middleware/zodValidate'
import express from 'express'
import bcrypt from 'bcrypt'
import { SignUpData, SignInSchema, SignUpSchema, SignInData } from '../lib/zodSchemas'
import { createSecretToken } from '../lib/jwtUtils'
import { createUser, getUserByEmail } from '../db/repositories/userRepository'
import { BadRequestProblem } from '../lib/errors'

const router = express.Router()

// POST /auth/sign-up - Sign up a new user
router.post('/sign-up', validate({ body: SignUpSchema }), async (req, res) => {
    const data = req.body as SignUpData

    const existingUser = await getUserByEmail(data.email)
    if (existingUser) {
        throw new BadRequestProblem('This email is already in use')
    }

    const hash = bcrypt.hashSync(data.password, 10)
    const user = await createUser({
        email: data.email,
        username: data.username,
        passwordHash: hash,
    })

    const token = createSecretToken(user._id, user.isAdmin)

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    })

    res.status(201).json({ message: 'Signed up' })
})

// POST /auth/sign-in - Sign in a user
router.post('/sign-in', validate({ body: SignInSchema }), async (req, res) => {
    const data = req.body as SignInData

    const user = await getUserByEmail(data.email)
    if (!user) {
        throw new BadRequestProblem('Incorrect email or password')
    }

    const isPasswordCorrect = await bcrypt.compare(data.password, user.passwordHash)
    if (!isPasswordCorrect) {
        throw new BadRequestProblem('Incorrect email or password')
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
