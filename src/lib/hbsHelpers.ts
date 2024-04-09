export const styleActive = (activePath: string, linkPath: string, style: string) => {
    return activePath === linkPath ? style : ''
}

export const eq = (a: unknown, b: unknown) => a === b

export const youAndAuthorIndicator = (
    userId: string,
    authorId: string,
    commentAuthorId: string
) => {
    console.log(userId, authorId, commentAuthorId)
    return userId === commentAuthorId ? ' (you)' : authorId === commentAuthorId ? ' (author)' : ''
}
