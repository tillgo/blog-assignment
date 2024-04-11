const handleCloseAlert = () => {
    const alert = document.getElementById('alert-snack')
    alert.classList.add('hidden')
}

const handleError = async (response) => {
    const data = await response.json()
    const label = document.getElementById('alert-message')
    label.innerText = data.message ?? 'An unexpected error occurred.'

    const alert = document.getElementById('alert-snack')
    alert.classList.remove('hidden')

    // timeout to hide the snack after 6 seconds automatically
    setTimeout(() => {
        alert.classList.add('hidden')
    }, 6000)
}
