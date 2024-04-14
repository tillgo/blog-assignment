document.addEventListener('DOMContentLoaded', function () {
    const url = new URL(window.location)
    const userSearch = url.searchParams.get('usersearch')

    const form = document.getElementById('search-users-form')
    form.querySelector('#usersearch').value = userSearch || ''
})
