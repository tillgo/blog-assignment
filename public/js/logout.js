const handleLogout = () => {
    fetch('/auth/logout', { method: 'DELETE' })
        .then(() => {
            window.location.reload()
        })
        .catch((error) => {
            console.error('Logout failed:', error)
        })
}
