const handleDeleteArticle = (articleId) => {
    fetch(`/api/articles/${articleId}`, {
        method: 'DELETE',
    }).then(async (res) => {
        if (res.ok) {
            window.location = '/blog'
        } else {
            await handleError(res)
        }
    })
}
