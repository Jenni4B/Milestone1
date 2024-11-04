
console.log('Script loaded');

// Function to change and save theme
function changeTheme(theme) {
    const elements = [
        document.body,
        document.querySelector('header'),
        document.querySelector('footer'),
        document.querySelector('.video-container'),
        document.querySelector('.description-box'),
        document.querySelector('.modal-overlay'),
        document.querySelector('.modal-container'),
        ...document.querySelectorAll('.modal-container label') // Target labels inside the modal
    ];

    elements.forEach(el => {
        if (el) {
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
        changeTheme(savedTheme); // Apply the saved theme
    }
}

// Function to create the user profile popup
function userProfile() {
    console.log('userProfile function called');

    // Create overlay and modal container
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    const modal = document.createElement('div');
    modal.className = 'modal-container';

    // Helper function to create input fields
    const createInputField = (labelText, inputType, inputId, placeholder) => {
        const fieldDiv = document.createElement('div');
        fieldDiv.className = 'profile-field';

        const label = document.createElement('label');
        label.setAttribute('for', inputId);
        label.textContent = labelText;

        const input = document.createElement('input');
        input.type = inputType;
        input.id = inputId;
        input.placeholder = placeholder;

        fieldDiv.append(label, input);
        return fieldDiv;
    };

    // Add form fields
    const profileForm = document.createElement('form');
    profileForm.id = 'profile-form';
    profileForm.append(
        createInputField('Username:', 'text', 'username', 'Username'),
        createInputField('Email:', 'email', 'email', 'Email'),
        createInputField('Password:', 'password', 'password', 'Password')
    );

    // Add update profile button
    const updateProfileButton = document.createElement('button');
    updateProfileButton.type = 'button';
    updateProfileButton.id = 'update-profile';
    updateProfileButton.textContent = 'Update Profile';
    profileForm.appendChild(updateProfileButton);

    // Add show password button
    const showPasswordButton = document.createElement('button');
    showPasswordButton.type = 'button';
    showPasswordButton.id = 'showPassword';
    showPasswordButton.textContent = 'Show Password';
    profileForm.appendChild(showPasswordButton);

    // Add theme-setting section without causing a reload
    const themeSetting = document.createElement('section');
    themeSetting.className = 'theme-setting';
    themeSetting.innerHTML = `
        <label>
            <button type="button" onclick="changeTheme('default')"> Default </button>
        </label>
        <label>
            <button type="button" onclick="changeTheme('darkMode')"> Dark Mode </button>
        </label>
    `;
    profileForm.appendChild(themeSetting);

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.textContent = 'Close';
    modal.appendChild(closeButton);

    // Append form to modal and modal to overlay
    modal.append(profileForm);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Load saved data into the form when opened
    loadProfileData();

    // Event listeners for closing the modal
    closeButton.addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.remove();
        }
    });

    // Event listener to save data to localStorage when the button is clicked
    updateProfileButton.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;

        // Validation for username length

        if (username.length < 4) {
        alert("Username must be at least 4 characters long.");
        return; // Stop the function if validation fails
    }

        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('email', email);
        alert("Profile items saved!");
    });

    // Show/hide password visibility
    showPassword();
}

// Function to load saved data from localStorage
function loadProfileData() {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    const savedEmail = localStorage.getItem('email');

    if (savedUsername) {
        document.getElementById('username').value = savedUsername;
    }
    if (savedPassword) {
        document.getElementById('password').value = savedPassword;
    }
    if (savedEmail) {
        document.getElementById('email').value = savedEmail; 
    }
}

// Function to handle showing/hiding password
function showPassword() {
    const passwordInput = document.getElementById('password');
    const showPasswordButton = document.getElementById('showPassword');

    showPasswordButton.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            showPasswordButton.textContent = 'Hide Password'; // Update button text
            showPasswordButton.style.backgroundColor = '#740d0d'
        } 
        
        else {
            passwordInput.type = 'password';
            showPasswordButton.textContent = 'Show Password';
            showPasswordButton.style.backgroundColor = '#007bff';
        }
    });
}

// Load and apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();

    // Show settings popup when the Settings button is clicked
    const openSettings = document.getElementById('settings');
    if (openSettings) {
        openSettings.addEventListener('click', userProfile);
    }
});
