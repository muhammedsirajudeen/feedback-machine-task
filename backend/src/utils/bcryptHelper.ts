import bcrypt from 'bcryptjs'

const SALT_ROUNDS = 10

/**
 * Hash a plain password
 */
export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    return await bcrypt.hash(password, salt)
}

/**
 * Compare plain password with hash
 */
export async function comparePassword(
    plainPassword: string,
    hashedPassword: string
): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword)
}
