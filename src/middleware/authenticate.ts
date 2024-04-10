import { NextFunction, Request, Response } from 'express'
import { verifySecretToken } from '../lib/jwtUtils'
import { TokenExpiredError } from 'jsonwebtoken'

/**
 * Middleware to authenticate a user before every request.
 *
 * The middleware checks if a token is present in the request cookies.
 * If a token is present, it verifies the token and sets the userId and isAdmin on the request object.
 *
 * @param req
 * @param res
 * @param next
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['token']

    if (!token) {
        return next()
    }

    try {
        // verify the JWT token
        const decoded = verifySecretToken(token)

        // if the token is valid, set the userId and isAdmin on the request object and locals (for handlebars)
        if (decoded.id && typeof decoded.isAdmin === 'boolean') {
            req.userId = decoded.id
            req.isAdmin = decoded.isAdmin

            res.locals.userId = decoded.id
            res.locals.isAdmin = decoded.isAdmin
        }

        return next()
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            // clear the cookie if the token has expired
            res.clearCookie('token')
            return next()
        } else {
            return next(error)
        }
    }
}
