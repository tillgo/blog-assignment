/**
 * Handle the deletion of user
 *
 * @param userId - the id of the user to be deleted
 */
const handleDeleteUser = async (userId) => {
    const res = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
    }).then(async (res) => {
        if (res.ok) {
            window.location.reload()
        } else {
            await handleError(res)
        }
    })
}
