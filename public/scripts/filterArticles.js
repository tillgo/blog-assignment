document.addEventListener('DOMContentLoaded', function () {
    const url = new URL(window.location)
    const search = url.searchParams.get('search')
    const author = url.searchParams.get('author')
    const tag = url.searchParams.get('tag')

    const form = document.getElementById('filter-articles-form')
    form.querySelector('#search').value = search || ''
    form.querySelector('#author').value = author || ''
    form.querySelector('#tag').value = tag || ''
})

const handleFilterTag = (tag) => {
    const url = new URL(window.location)
    url.searchParams.set('tag', encodeURIComponent(tag))

    window.location = url
}
