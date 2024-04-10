import jwt, { JwtPayload } from 'jsonwebtoken'
import mongoose from 'mongoose'

/**
 * Create a secret token with 1week expiration
 *
 * @param id user id
 * @param isAdmin flag for admin role
 */
export const createSecretToken = (id: mongoose.Types.ObjectId, isAdmin: boolean) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET ?? '', {
        expiresIn: '1w',
    })
}

/**
 * Verify a secret token
 *
 * @param token
 */
export const verifySecretToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload
}
