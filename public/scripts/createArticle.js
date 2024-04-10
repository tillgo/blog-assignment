let quill = null
document.addEventListener('DOMContentLoaded', function () {
    const toolbarOptions = [
        [{ header: [1, 2, 3, false] }],

        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        ['link', 'image'],

        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ indent: '-1' }, { indent: '+1' }],
    ]
    quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions,
        },
    })

    // prevent submit on enter
    document.getElementById('new-article-form').addEventListener('keydown', function (event) {
        if (event.keyCode === 13) {
            event.preventDefault()
        }
    })

    document.getElementById('new-article-form').addEventListener('submit', async (event) => {
        event.preventDefault()

        const form = document.getElementById('new-article-form')

        const title = form.querySelector('#title').value
        const subtitle = form.querySelector('#subtitle').value || undefined
        const category = form.querySelector('#category').value || undefined
        const timeToRead = form.querySelector('#timeToRead').value
            ? parseInt(form.querySelector('#timeToRead').value)
            : undefined
        const image = form.querySelector('#image').value || undefined
        const authorId = form.querySelector('#authorId').value

        const content = quill.root.innerHTML
        console.log({ title, subtitle, category, timeToRead, image, body: content, authorId })

        fetch('/api/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                subtitle,
                category,
                timeToRead,
                image,
                body: content,
                authorId,
            }),
        }).then(async (res) => {
            if (res.ok) {
                const data = await res.json()
                window.location = `/articles/${data._id}`
            }
        })
    })
})
