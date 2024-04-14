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
