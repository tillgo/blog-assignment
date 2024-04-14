import { getUserModel, NewUser, User } from '../models/user'
import { escapeForRegex } from '../../lib/regexUtils'

/**
 * Get a user by email
 *
 * @param email - The email of the user to fetch
 * @returns The user, or null if not found
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
    return await getUserModel().findOne({ email: email }).lean().exec()
}

/**
 * Get a user by ID
 *
 * @param userId - The ID of the user to fetch
 * @returns The user, or null if not found
 */
export const getUserById = async (userId: string): Promise<User | null> => {
    return await getUserModel().findById(userId).lean().exec()
}

/**
 * Create a new user
 *
 * @param data - The data for the new user
 * @returns The newly created user
 */
export const createUser = async (data: NewUser): Promise<User> => {
    return await new (getUserModel())(data).save()
}

/**
 * Delete a user
 *
 * @param userId - The ID of the user to delete
 */
export const deleteUser = async (userId: string) => {
    await getUserModel().findByIdAndDelete(userId).exec()
}

/**
 * Update a user
 *
 * @param userId User ID
 * @param data Data to update
 * @returns Updated user, or null if not found
 */
export const updateUser = async (userId: string, data: Partial<User>): Promise<User | null> => {
    return await getUserModel().findByIdAndUpdate(userId, data, { new: true }).exec()
}

/**
 * Find users by filter
 *
 * @param search Search string
 * @param limit Maximum number of users to return, default is unlimited
 * @returns List of users
 */
export const findAuthorsByFilter = async (
    search: string | undefined,
    limit: number = 0
): Promise<User[]> => {
    const pattern = new RegExp(escapeForRegex(search), 'i')
    return await getUserModel()
        .find({
            $or: [{ username: { $regex: pattern } }, { email: search }],
        })
        .select('-passwordHash')
        .limit(limit)
        .lean()
        .exec()
}
