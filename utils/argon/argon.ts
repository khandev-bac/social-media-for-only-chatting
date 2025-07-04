import { hash, verify } from "argon2"

export async function hashedPassword(password: string): Promise<string> {
    return await hash(password)
}
export async function verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
    return await verify(hashedPassword, password)
}