import jwt, { JwtPayload } from 'jsonwebtoken'

export const createSecretToken = (id: string, isAdmin: boolean) => {
    return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET ?? '', {
        expiresIn: '1w',
    })
}

export const verifySecretToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET ?? '') as JwtPayload
}
