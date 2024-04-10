import { Article, getArticleModel } from '../models/article'
import { CreateArticleData } from '../../lib/zodSchemas'

export const createArticle = async (article: CreateArticleData): Promise<Article> => {
    return await new (getArticleModel())(article).save()
}

export const getArticleById = async (id: string): Promise<Article | null> => {
    return await getArticleModel()
        .findById(id)
        .populate('author')
        .populate('comments.author')
        .lean()
        .exec()
}
