import express from 'express'
import { guardPage } from '../../middleware/guardPage'
import {
    createUser,
    deleteUser,
    getUserByEmail,
    getUserById,
    updateUser,
} from '../../db/repositories/userRepository'
import { validate } from '../../middleware/zodValidate'
import {
    CreateUserAsAdminData,
    CreateUserAsAdminSchema,
    UpdateUserData,
    UpdateUserSchema,
} from '../../lib/zodSchemas'
import { User } from '../../db/models/user'
import bcrypt from 'bcrypt'
import { BadRequestProblem } from '../../lib/errors'
import { deleteArticlesForUser } from '../../db/repositories/articleRepository'

const router = express.Router()

router.post('/', guardPage(true), validate({ body: CreateUserAsAdminSchema }), async (req, res) => {
    const data = req.body as CreateUserAsAdminData

    const existingUser = await getUserByEmail(data.email)
    if (existingUser) {
        throw new BadRequestProblem('This email is already in use')
    }

    const passwordHash = bcrypt.hashSync(data.password, 10)
    const newUser = await createUser({ username: data.username, email: data.email, passwordHash })

    res.status(201).json({ user: newUser })
})

// PUT /api/users/:userId - Update a user
router.put('/:userId', guardPage(true), validate({ body: UpdateUserSchema }), async (req, res) => {
    const userId = req.params.userId
    const data = req.body as UpdateUserData

    const update = { username: data.username, email: data.email } as Partial<User>

    if (data.password) {
        update.passwordHash = bcrypt.hashSync(data.password, 10)
    }

    const updatedUser = await updateUser(userId, update)
    if (!updatedUser) {
        throw new BadRequestProblem('User not found')
    }

    res.status(200).json({ message: 'Updated User' })
})

// DELETE /api/users/:userId - Delete a user
router.delete('/:userId', guardPage(true), async (req, res) => {
    const userId = req.params.userId

    const user = await getUserById(userId)
    if (!user) {
        throw new BadRequestProblem('User not found')
    } else if (user.isAdmin) {
        throw new BadRequestProblem('Deleting and admin user is not allowed')
    }

    await deleteArticlesForUser(userId)
    await deleteUser(userId)

    res.status(204).json({ message: 'User deleted' })
})

export default router
