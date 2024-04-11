const handleLogout = () => {
    fetch('/api/auth/logout', { method: 'DELETE' }).then(() => {
        window.location.reload()
    })
}

const handleSignIn = () => {
    const form = document.getElementById('sign-in-form')
    const email = form.querySelector('#email').value
    const password = form.querySelector('#password').value

    fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then(async (res) => {
        await handleResponse(res)
    })
}

const handleSignUp = () => {
    const form = document.getElementById('sign-up-form')
    const email = form.querySelector('#email').value
    const username = form.querySelector('#username').value
    const password = form.querySelector('#password').value

    fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
    }).then(async (res) => {
        await handleResponse(res)
    })
}

const handleResponse = async (res) => {
    if (res.ok) {
        // Redirect to the page that the user was trying to access
        const urlParams = new URLSearchParams(window.location.search)
        const redirectTo = urlParams.get('redirectTo') ?? '/'
        window.location = decodeURIComponent(redirectTo)
    } else {
        const data = await res.json()

        const errorLabel = document.getElementById('sign-in-error')
        errorLabel.classList.remove('hidden')

        if (data.validationErrors) {
            errorLabel.innerText = data.validationErrors.join(',\n')
        } else {
            errorLabel.innerText = data.message ?? 'An unexpected error occurred.'
        }
    }
}
