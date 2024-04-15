document.addEventListener('DOMContentLoaded', function () {
    // load all query params and set them in the form

    const url = new URL(window.location)
    const search = url.searchParams.get('search')
    const author = url.searchParams.get('author')
    const tag = url.searchParams.get('tag')

    const form = document.getElementById('filter-articles-form')
    form.querySelector('#search').value = search || ''
    form.querySelector('#author').value = author || ''
    form.querySelector('#tag').value = tag || ''
})
