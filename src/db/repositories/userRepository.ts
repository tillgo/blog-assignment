import { getUserModel, NewUser, User } from '../models/user'

export const getUserByEmail = async (email: string): Promise<User | null> => {
    return await getUserModel().findOne({ email: email }).exec()
}

export const createUser = async (data: NewUser): Promise<User> => {
    return await new (getUserModel())(data).save()
}
