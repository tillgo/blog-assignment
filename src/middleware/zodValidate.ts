import { Request, Response, NextFunction } from 'express'
import { AnyZodObject, z } from 'zod'

type Schema<T extends AnyZodObject, K extends AnyZodObject, J extends AnyZodObject> = {
    body?: T
    query?: K
    params?: J
}

/**
 * Combines the given zod schemas for body, query and params into a single schema object.
 *
 * @param schema Zod schema to combine
 * @returns Combined zod schema
 */
const createCombinedSchema = <
    T extends AnyZodObject,
    K extends AnyZodObject,
    J extends AnyZodObject,
>(
    schema: Schema<T, K, J>
) => {
    return z.object({
        body: schema.body ? schema.body : z.any(), // Optional body schema
        query: schema.query ? schema.query : z.any(), // Optional query schema
        params: schema.params ? schema.params : z.any(), // Optional params schema
    })
}

/**
 * Middleware to validate request data using a given zod schema.
 *
 * @param schema Zod schema to validate request data
 * @throws ZodError if the request data is invalid
 * @returns Middleware function
 */
export const validate =
    <T extends AnyZodObject, K extends AnyZodObject, J extends AnyZodObject>(
        schema: Schema<T, K, J>
    ) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const zodSchema = createCombinedSchema(schema)
            zodSchema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            })

            next()
        } catch (error) {
            next(error) // ZodError will be caught by the errorHandler
        }
    }
