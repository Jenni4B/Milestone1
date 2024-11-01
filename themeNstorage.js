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

let username = document.getElementById('username')
let password = document.getElementById('password')
let email = document.getElementById('email')
const updateProfile = document.getElementById('update-profile')

updateProfile.addEventListener('click', () => {
    // Retrieve the values when the button is clicked
    localStorage.setItem('username', username.value);
    localStorage.setItem('password', password.value);
    localStorage.setItem('email', email.value);
    alert("Profile items saved! <3")
});

const showPassword = document.getElementById('showPassword')

showPassword.addEventListener('click', ()=> {

    // Checks if the password field is type "password"

    if (password.type === 'password') {
        // Change the type to "text" to show the password

        password.type = 'text';
        showPassword.textContent = '👁️‍🗨️'; // Update button text

    } 
    
    else {
        // Change the type back to "password" to hide it
        password.type = 'password';
        showPassword.textContent = '👁️'; 
    }
    
});