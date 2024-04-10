import { NextFunction, Request, Response } from 'express'
import { ForbiddenProblem, UnauthorizedProblem } from '../lib/errors'

/**
 * Middleware to authorize an admin
 *
 * @param req
 * @param res
 * @param next
 */
export const authorizeAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.userId) {
        throw new UnauthorizedProblem()
    } else if (!req.isAdmin) {
        throw new ForbiddenProblem()
    }
    next()
}
