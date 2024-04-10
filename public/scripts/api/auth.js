const handleLogout = () => {
    fetch('/auth/logout', { method: 'DELETE' }).then(() => {
        window.location.reload()
    })
}

const handleSignIn = () => {
    const form = document.getElementById('sign-in-form')
    const username = form.querySelector('#username').value
    const password = form.querySelector('#password').value

    fetch('/auth/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    }).then(async (res) => {
        if (res.ok) {
            window.location = '/'
        } else {
            const data = await res.json()
            handleError(data)
        }
    })
}

const handleSignUp = () => {
    const form = document.getElementById('sign-up-form')
    const username = form.querySelector('#username').value
    const password = form.querySelector('#password').value

    fetch('/auth/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    }).then(async (res) => {
        if (res.ok) {
            window.location = '/'
        } else {
            const data = await res.json()
            handleError(data)
        }
    })
}

const handleError = (data) => {
    const errorLabel = document.getElementById('sign-in-error')
    errorLabel.classList.remove('hidden')

    if (data.validationErrors) {
        errorLabel.innerText = data.validationErrors.join(',\n')
    } else {
        errorLabel.innerText = data.message
    }
}
