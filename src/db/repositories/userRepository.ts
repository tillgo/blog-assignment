import { getUserModel, NewUser } from '../models/user'

export const getUserByName = async (username: string) => {
    return await getUserModel().findOne({ username: username }).exec()
}

export const createUser = async (data: NewUser) => {
    return await new (getUserModel())(data).save()
}
