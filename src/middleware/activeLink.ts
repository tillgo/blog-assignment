import { NextFunction, Request, Response } from 'express'

/**
 * Middleware to set the active path on the response locals (for handlebars)
 *
 * @param req
 * @param res
 * @param next
 */
export const activeLink = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.activePath = req.path

    next()
}
