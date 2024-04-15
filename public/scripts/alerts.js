let timeout = null

/**
 * Closes the alert snack
 */
const handleCloseAlert = () => {
    if (timeout) {
        clearTimeout(timeout)
        timeout = null
    }

    const alert = document.getElementById('alert-snack')
    alert.classList.add('hidden')
}

/**
 * Handles the error response from the server. This should be called if response.ok is false.
 *
 * @param response - the response from the server
 */
const handleError = async (response) => {
    if (timeout) {
        clearTimeout(timeout)
        timeout = null
    }

    const data = await response.json()
    const label = document.getElementById('alert-message')
    label.innerText = data.message ?? 'An unexpected error occurred.'
    if (data.validationErrors) {
        label.innerText = data.validationErrors.join(',\n')
    } else {
        label.innerText = data.message ?? 'An unexpected error occurred.'
    }

    const alert = document.getElementById('alert-snack')
    alert.classList.remove('hidden')

    // timeout to hide the snack after 6 seconds automatically
    timeout = setTimeout(() => {
        alert.classList.add('hidden')
    }, 6000)
}
