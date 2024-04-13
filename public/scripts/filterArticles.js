document.addEventListener('DOMContentLoaded', function () {
    const url = new URL(window.location)
    const search = url.searchParams.get('search')
    const author = url.searchParams.get('author')
    const tag = url.searchParams.get('tag')

    const form = document.getElementById('filter-articles-form')
    form.querySelector('#search').value = search || ''
    form.querySelector('#author').value = author || ''
    form.querySelector('#tag').value = tag || ''

    document.getElementById('filter-articles-form').addEventListener('submit', async (event) => {
        event.preventDefault()

        const form = document.getElementById('filter-articles-form')

        const search = form.querySelector('#search').value
        const author = form.querySelector('#author').value
        const tag = form.querySelector('#tag').value

        const url = new URL(window.location)
        url.searchParams.set('search', encodeURIComponent(search))
        url.searchParams.set('author', encodeURIComponent(author))
        url.searchParams.set('tag', encodeURIComponent(tag))

        window.location = url
    })
})

const handleFilterTag = (tag) => {
    const url = new URL(window.location)
    url.searchParams.set('tag', encodeURIComponent(tag))

    window.location = url
}
