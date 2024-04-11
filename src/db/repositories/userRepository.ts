import { getUserModel, NewUser, User } from '../models/user'

/**
 * Get a user by email
 *
 * @param email - The email of the user to fetch
 * @returns The user, or null if not found
 */
export const getUserByEmail = async (email: string): Promise<User | null> => {
    return await getUserModel().findOne({ email: email }).exec()
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
