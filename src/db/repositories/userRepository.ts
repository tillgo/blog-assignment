import { getUserModel, NewUser, User } from '../models/user'

export const getUserByName = async (username: string): Promise<User | null> => {
    return await getUserModel().findOne({ username: username }).exec()
}

export const createUser = async (data: NewUser): Promise<User> => {
    return await new (getUserModel())(data).save()
}
