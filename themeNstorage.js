// Function to change and save theme
function changeTheme(theme) {
    const elements = [
        document.body,
        document.querySelector('header'),
        document.querySelector('footer'),
        document.querySelector('.video-container'),
        document.querySelector('.description-box')
    ];

    elements.forEach(el => {
        if (el) {
            // Apply dark mode if the theme is 'darkMode'
            el.classList.toggle('dark-mode', theme === 'darkMode');
        }
    });

    // Save the selected theme to localStorage
    localStorage.setItem('theme', theme);
}

// Function to load and apply saved theme on page load
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        changeTheme(savedTheme);  // Apply the saved theme
    }
}

// Run this function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
});

