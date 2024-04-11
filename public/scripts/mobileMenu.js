const handleOpenMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu')
    mobileMenu.classList.remove('hidden')
}

const handleCloseMobileMenu = () => {
    const mobileMenu = document.getElementById('mobile-menu')
    mobileMenu.classList.add('hidden')
}
