import { NextFunction, Request, Response } from 'express'
import { UnauthorizedProblem } from '../lib/errors'

/**
 * Middleware to authorize a user
 *
 * @param req
 * @param res
 * @param next
 */
export const authorizeUser = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.userId) {
        throw new UnauthorizedProblem()
    }
    next()
}
