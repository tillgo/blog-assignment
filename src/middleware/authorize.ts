import { NextFunction, Request, Response } from 'express'
import { ForbiddenProblem, UnauthorizedProblem } from '../lib/errors'

/**
 * Middleware to authorize users or admins for api routes.
 *
 * @param admin - if true, only allow admin users
 */
export const authorize =
    (admin: boolean) => async (req: Request, res: Response, next: NextFunction) => {
        if (!req.userId) {
            throw new UnauthorizedProblem()
        } else if (!req.isAdmin) {
            throw new ForbiddenProblem()
        }
        next()
    }
