/**
 * Mobile menu open
 */
const handleOpenMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu')
    mobileMenu.classList.remove('hidden')
}

/**
 * Mobile menu close
 */
const handleCloseMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu')
    mobileMenu.classList.add('hidden')
}
