document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('user-edit-form').addEventListener('submit', async (event) => {
        event.preventDefault()

        const form = document.getElementById('user-edit-form')

        const id = form.querySelector('#id').value
        const username = form.querySelector('#username').value
        const email = form.querySelector('#email').value
        const password = form.querySelector('#password').value || undefined

        fetch(`/api/users/${id}`, {
            method: 'PUT',
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