import { NextFunction, Request, Response } from 'express'

/**
 * Middleware to guard page routes, that require being logged in or admin.
 *
 * Redirects to the sign-in page if the user is not logged in.
 * Redirects to the home page if the user is not an admin and the route requires admin access.
 *
 * @param admin - if true, only allow admin users
 */
export const guardPage =
    (admin: boolean) => async (req: Request, res: Response, next: NextFunction) => {
        if (!req.userId) {
            return res.redirect('/sign-in?redirectTo=' + encodeURIComponent(req.originalUrl))
        }
        if (!req.isAdmin && admin) {
            return res.redirect('/')
        }
        next()
    }
