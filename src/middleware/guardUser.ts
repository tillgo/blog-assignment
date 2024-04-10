import { NextFunction, Request, Response } from 'express'

/**
 * Middleware to guard routes that require a user
 *
 * @param req
 * @param res
 * @param next
 */
export const guardUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.userId) {
        return res.redirect('/sign-in')
    }
    next()
}
