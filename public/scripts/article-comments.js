const handleEditToggle = (commentId, body) => {
    const editCommentContainer = document.getElementById(`edit-comment-${commentId}`)
    const comment = document.getElementById(`comment-${commentId}`)
    const editCommentInput = document.getElementById(`edit-comment-input-${commentId}`)

    editCommentContainer.classList.toggle('hidden')
    comment.classList.toggle('hidden')
    editCommentInput.value = body
}
