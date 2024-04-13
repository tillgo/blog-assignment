// all helper functions are exported and used in the handlebars template engine

/**
 * Helper function to style active links
 *
 * @param activePath active path
 * @param linkPath link path that must match the active path
 * @param style the style to apply if the paths match
 */
export const styleActive = (activePath: string, linkPath: string, style: string) => {
    return activePath === linkPath ? style : ''
}

/**
 * Helper for equals check
 *
 * @param a
 * @param b
 */
export const eq = (a: unknown, b: unknown) => a == b

/**
 * Helper for 'or' operation
 *
 * @param a
 * @param b
 */
export const or = (a: unknown, b: unknown) => a || b

/**
 * Helper function to indicate if the current user is the author of a comment or the author of the article
 *
 * Returns ' (you)' if the current user is the author of the comment, ' (author)' if the current user is the author of the article
 *
 * @param userId The ID of the current user
 * @param authorId The ID of the author of the article
 * @param commentAuthorId The ID of the author of the comment
 */
export const youAndAuthorIndicator = (
    userId: string,
    authorId: string,
    commentAuthorId: string
) => {
    return userId === commentAuthorId ? ' (you)' : authorId === commentAuthorId ? ' (author)' : ''
}

/**
 * Helper function to join an array of strings
 *
 * @param arr The array of strings to join
 * @returns The joined string
 */
export const join = (arr: string[] | undefined) => (arr ? arr.join(', ') : '')
