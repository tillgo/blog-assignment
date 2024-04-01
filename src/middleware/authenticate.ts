import { NextFunction, Request, Response } from 'express'
import { verifySecretToken } from '../lib/jwtUtils'
import { TokenExpiredError } from 'jsonwebtoken'

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['token']

    if (!token) {
        return next()
    }

    try {
        // verify the JWT token
        const decoded = verifySecretToken(token)

        // if the token is valid, set the userId and isAdmin on the request object
        if (decoded.id && typeof decoded.isAdmin === 'boolean') {
            // @ts-ignore
            req.userId = decoded.id
            // @ts-ignore
            req.isAdmin = decoded.isAdmin
        }

        return next()
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            res.clearCookie('token')
            return next()
        } else {
            console.error('Unexpected error', error)
            return next(error)
        }
    }
}
