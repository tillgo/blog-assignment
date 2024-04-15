document.addEventListener('DOMContentLoaded', function () {
    // register the submit event for editing a user
    document.getElementById('user-edit-form').addEventListener('submit', async (event) => {
        event.preventDefault()

        const form = document.getElementById('user-edit-form')

        const isEdit = form.querySelector('#isEdit').value === 'true'

        const id = form.querySelector('#id').value
        const username = form.querySelector('#username').value
        const email = form.querySelector('#email').value
        const password = form.querySelector('#password').value || undefined

        fetch(`/api/users/${isEdit ? `/${id}` : ''}`, {
            method: isEdit ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        }).then(async (res) => {
            if (res.ok) {
                window.location = `/admin-panel`
            } else {
                await handleError(res)
            }
        })
    })
})
