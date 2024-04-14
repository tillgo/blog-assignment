import { z } from 'zod'

export const SignUpSchema = z.object({
    email: z.string().describe('Email').email('Invalid email address'),
    username: z
        .string()
        .describe('Username')
        .max(20, "Username can't be longer than 20 characters")
        .min(3, 'Username must be at least 3 characters long')
        .regex(/^[a-zA-Z0-9_]*$/, 'Username can only contain letters, numbers, and underscores'),
    password: z
        .string()
        .describe('Password')
        .max(64, "Password can't be longer than 50 characters")
        .min(6, 'Password must be at least 6 characters long'),
})
export type SignUpData = z.infer<typeof SignUpSchema>

export const SignInSchema = z.object({
    email: z.string().describe('Email').email('Invalid email address'),
    password: z.string().describe('Password'),
})
export type SignInData = z.infer<typeof SignInSchema>

export const SetArticleSchema = z.object({
    title: z
        .string()
        .max(120, "Title can't be longer than 120 characters")
        .min(3, 'Title must be at least 3 characters long'),
    subtitle: z.string().max(200, "Subtitle can't be longer than 200 characters"),
    authorId: z.string(),
    tags: z
        .array(z.string())
        .optional()
        .refine((input) => (input?.length ?? 0) <= 3, {
            message: 'An article can have at most 3 tags',
        }),
    timeToRead: z.number().min(1, 'Time to read must be at least 1 minute').optional(),
    image: z.string().max(500, "Image-URL can't be longer than 500 characters").optional(),
    body: z.string({ required_error: 'Article must have content' }),
})
export type SetArticleData = z.infer<typeof SetArticleSchema>

export const SetCommentSchema = z.object({
    body: z.string().min(1, 'Comment must be at least 1 character long'),
})
export type SetCommentData = z.infer<typeof SetCommentSchema>

export const SearchArticlesFilterSchema = z.object({
    search: z.string().optional(),
    author: z.string().optional(),
    tag: z.string().optional(),
})
export type SearchArticlesFilterData = z.infer<typeof SearchArticlesFilterSchema>

export const UpdateUserSchema = z.object({
    username: z
        .string()
        .max(20, "Username can't be longer than 20 characters")
        .min(3, 'Username must be at least 3 characters long')
        .regex(/^[a-zA-Z0-9_]*$/, 'Username can only contain letters, numbers, and underscores'),
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .max(64, "Password can't be longer than 50 characters")
        .min(6, 'Password must be at least 6 characters long')
        .optional(),
})
export type UpdateUserData = z.infer<typeof UpdateUserSchema>

export const CreateUserAsAdminSchema = z.object({
    username: z
        .string()
        .max(20, "Username can't be longer than 20 characters")
        .min(3, 'Username must be at least 3 characters long')
        .regex(/^[a-zA-Z0-9_]*$/, 'Username can only contain letters, numbers, and underscores'),
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .max(64, "Password can't be longer than 50 characters")
        .min(6, 'Password must be at least 6 characters long'),
})
export type CreateUserAsAdminData = z.infer<typeof CreateUserAsAdminSchema>
