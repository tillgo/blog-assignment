/**
 * Handle delete article
 *
 * @param articleId - the id of the article
 * @param redirect - the page to redirect to after deleting the article
 */
const handleDeleteArticle = (articleId, redirect = '/blog') => {
    fetch(`/api/articles/${articleId}`, {
        method: 'DELETE',
    }).then(async (res) => {
        if (res.ok) {
            window.location = redirect
        } else {
            await handleError(res)
        }
    })
}
