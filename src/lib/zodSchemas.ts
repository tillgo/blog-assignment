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

export const SetArticleSchema = z.object({
    title: z
        .string()
        .max(200, "Title can't be longer than 200 characters")
        .min(3, 'Title must be at least 3 characters long'),
    subtitle: z.string().max(200, "Subtitle can't be longer than 200 characters").optional(),
    authorId: z.string(),
    category: z.string().max(50, "Category can't be longer than 50 characters").optional(),
    timeToRead: z.number().optional(),
    image: z.string().max(200, "Image-URL can't be longer than 200 characters").optional(),
    body: z.string(),
})
export type SetArticleData = z.infer<typeof SetArticleSchema>

export const SetCommentSchema = z.object({
    authorId: z.string(),
    body: z.string().min(1, 'Comment must be at least 1 character long'),
})
export type SetCommentData = z.infer<typeof SetCommentSchema>

export const UpdateCommentSchema = z.object({
    body: z.string().min(1, 'Comment must be at least 1 character long'),
})
export type UpdateCommentData = z.infer<typeof UpdateCommentSchema>
