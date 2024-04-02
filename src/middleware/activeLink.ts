import { NextFunction, Request, Response } from 'express'

export const activeLink = async (req: Request, res: Response, next: NextFunction) => {
    res.locals.activePath = req.path

    next()
}
