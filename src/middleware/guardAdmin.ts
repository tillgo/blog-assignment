import { NextFunction, Request, Response } from 'express'

/**
 * Middleware to guard routes that require an admin
 *
 * @param req
 * @param res
 * @param next
 */
export const guardAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.userId) {
        return res.redirect('/sign-in')
    }
    if (!req.isAdmin) {
        return res.redirect('/')
    }
    next()
}
