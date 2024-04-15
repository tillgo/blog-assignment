let quill = null
document.addEventListener('DOMContentLoaded', function () {
    const toolbarOptions = [
        [{ header: [1, 2, 3, false] }],

        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        ['link', 'image'],

        [{ list: 'ordered' }],
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

    // register the submit event for creating a new article
    document.getElementById('new-article-form').addEventListener('submit', async (event) => {
        event.preventDefault()

        const form = document.getElementById('new-article-form')

        const isEdit = form.querySelector('#isEdit').value === 'true'
        const articleId = form.querySelector('#articleId').value

        const title = form.querySelector('#title').value
        const subtitle = form.querySelector('#subtitle').value || undefined
        const tagsString = form.querySelector('#tags').value || undefined
        const timeToRead = form.querySelector('#timeToRead').value
            ? parseInt(form.querySelector('#timeToRead').value)
            : undefined
        const image = form.querySelector('#image').value || undefined
        const authorId = form.querySelector('#authorId').value

        const content = quill.root.innerHTML === '<p><br></p>' ? undefined : quill.root.innerHTML

        fetch(`/api/articles${isEdit ? `/${articleId}` : ''}`, {
            method: isEdit ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    title,
                    subtitle,
                    tags: tagsString ? tagsString.split(',').map((tag) => tag.trim()) : [],
                    timeToRead,
                    image,
                    body: content,
                    authorId,
                },
                function (k, v) {
                    return v === undefined ? null : v
                }
            ),
        }).then(async (res) => {
            if (res.ok) {
                const data = await res.json()

                window.location = `/blog/${data._id}`
            } else {
                await handleError(res)
            }
        })
    })
})
