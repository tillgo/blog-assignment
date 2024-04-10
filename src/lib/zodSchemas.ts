import { z } from 'zod'

/**
 * Schema for the sign-in and sign-up form data
 */
export const LoginSchema = z.object({
    username: z
        .string()
        .describe('Username')
        .max(50, "Username can't be longer than 50 characters")
        .min(3, 'Username must be at least 3 characters long')
        .regex(/^[a-zA-Z0-9_]*$/, 'Username can only contain letters, numbers, and underscores'),
    password: z
        .string()
        .describe('Password')
        .max(64, "Password can't be longer than 50 characters")
        .min(6, 'Password must be at least 6 characters long'),
})
export type LoginData = z.infer<typeof LoginSchema>
