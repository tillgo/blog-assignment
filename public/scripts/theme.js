/**
 * Theme switcher
 */
const handleThemeToggle = () => {
    const currentTheme = getTheme()
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

    localStorage.setItem('theme', newTheme)
    document.body.classList.remove(currentTheme)
    document.body.classList.add(newTheme)
}

/**
 * Get the current theme from local storage or system preference
 *
 * @returns {string|string}
 */
const getTheme = () => {
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    return localStorage.getItem('theme') ?? systemPreference
}

// set dark mode on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = getTheme()
    document.body.classList.add(currentTheme)
})
