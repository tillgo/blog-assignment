/**
 * Handle toggle of opening and closing the edit comment form
 *
 * @param commentId - the id of the comment
 * @param body - the body of the comment
 */
const handleEditToggle = (commentId, body) => {
    const editCommentContainer = document.getElementById(`edit-comment-${commentId}`)
    const comment = document.getElementById(`comment-${commentId}`)
    const editCommentInput = document.getElementById(`edit-comment-input-${commentId}`)

    editCommentContainer.classList.toggle('hidden')
    comment.classList.toggle('hidden')
    editCommentInput.value = body
}

/**
 * Handle editing of the comment
 *
 * @param commentId - the id of the comment
 */
const handleEditComment = (commentId) => {
    const editCommentInput = document.getElementById(`edit-comment-input-${commentId}`)
    const body = editCommentInput.value

    fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body }),
    }).then(async (res) => {
        if (res.ok) {
            window.location.reload()
        } else {
            await handleError(res)
        }
    })
}

/**
 * Handle deleting the comment
 *
 * @param commentId - the id of the comment
 */
const handleDeleteComment = (commentId) => {
    fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
    }).then(async (res) => {
        if (res.ok) {
            window.location.reload()
        } else {
            await handleError(res)
        }
    })
}

// after form is loaded, register the submit event for writing a comment
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('comment-form').addEventListener('submit', async (event) => {
        event.preventDefault()

        const form = document.getElementById('comment-form')
        const body = form.querySelector('#comment-input').value
        const articleId = form.querySelector('#articleId').value

        fetch(`/api/articles/${articleId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ body }),
        }).then(async (res) => {
            if (res.ok) {
                form.reset()
                window.location.reload()
            } else {
                await handleError(res)
            }
        })
    })
})
