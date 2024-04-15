let is24h = true

// load the query params and set them in the form + update labels
document.addEventListener('DOMContentLoaded', function () {
    const url = new URL(window.location)
    const userSearch = url.searchParams.get('usersearch')
    const lastFive = url.searchParams.get('lastFive') === 'true'

    if (lastFive) {
        const button = document.getElementById('admin-article-filter')
        const label = document.getElementById('admin-recent-label')

        label.innerHTML = 'Recent 5 Articles:'
        button.innerHTML = 'Show Past 24h'
        is24h = false
    }

    const form = document.getElementById('search-users-form')
    form.querySelector('#usersearch').value = userSearch || ''
})

/**
 * Toggle between loading past 24h articles and recent 5 articles
 */
const handleToggleArticlesView = () => {
    const button = document.getElementById('admin-article-filter')
    const label = document.getElementById('admin-recent-label')
    const url = new URL(window.location)

    if (is24h) {
        label.innerHTML = 'Recent 5 Articles:'
        button.innerHTML = 'Show Past 24h'
        url.searchParams.set('lastFive', 'true')
    } else {
        label.innerHTML = 'Recent Articles (24h):'
        button.innerHTML = 'Show Recent 5'
        url.searchParams.delete('lastFive')
    }

    window.location = url
}
