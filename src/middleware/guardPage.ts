import { NextFunction, Request, Response } from 'express'

/**
 * Middleware to guard page routes, that require being logged in or admin.
 *
 * @param admin - if true, only allow admin users
 */
export const guardPage =
    (admin: boolean) => async (req: Request, res: Response, next: NextFunction) => {
        if (!req.userId) {
            return res.redirect('/sign-in')
        }
        if (!req.isAdmin && admin) {
            return res.redirect('/')
        }
        next()
    }
