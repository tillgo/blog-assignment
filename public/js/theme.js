const setTheme = () => {
    const currentTheme = getTheme()
    document.body.classList.add(currentTheme)
    console.log('loaded theme: ' + currentTheme)
}

const handleThemeToggle = () => {
    const currentTheme = getTheme()
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

    localStorage.setItem('theme', newTheme)
    document.body.classList.remove(currentTheme)
    document.body.classList.add(newTheme)
}

const getTheme = () => {
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    return localStorage.getItem('theme') ?? systemPreference
}
