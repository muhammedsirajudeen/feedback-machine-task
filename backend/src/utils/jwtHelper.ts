import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken'
import { envConfig } from '../config/envConfig'


/**
 * Sign a payload and return JWT token
 */
export function signToken<T extends object>(
    payload: T,
    options?: SignOptions
): string {
    return jwt.sign(payload, envConfig.JWT_SECRET, {
        expiresIn: '7d',
        ...options,
    })
}

/**
 * Verify and decode a token
 */
export function verifyToken<T = JwtPayload>(token: string): T {
    return jwt.verify(token, envConfig.JWT_SECRET) as T
}

/**
 * Decode a token *without verifying*
 */
export function decodeToken(token: string): null | JwtPayload | string {
    return jwt.decode(token)
}
