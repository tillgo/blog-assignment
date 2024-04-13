/**
 * Escape special characters in a string to be used in a regex.
 * @param search - The string to escape
 * @returns The escaped string
 */
export const escapeForRegex = (search: string | undefined) => {
    if (!search) {
        return ''
    }
    const escapeChars = /[-\\^$*+?.()|[\]{}]/g
    return search.replace(escapeChars, '\\$&')
}
