let videos = [
    {
        link: "https://www.youtube.com/embed/k5rEQ2wFPUw",
        videoTitle: "A playlist for night studies (dark academia)",
        description: "A video for late night studying. Make sure you drink water and stretch occasionally.",
        genre: "Music"
    },
    {
        link: "https://www.youtube.com/embed/NAKOzMekf2c?si=CE0tMYVxvOyaqLP0",
        videoTitle: "Roblox Halloween Event 2022",
        description: "Thanks for sticking around and having patience! Enjoy!",
        genre: "Gaming"
    },
    {
        link: "https://www.youtube.com/embed/oSVPkuplVRY",
        videoTitle: "I Built a PC that Makes Coffee",
        description: "I turned my computer into an actual working coffee machine!",
        genre: "Art"
    },
    {
        link: "https://www.youtube.com/embed/GVPAjftmqr4",
        videoTitle: "Just trying to make some Cheese Cake...",
        description: "Sweet Potato Cheese Cake. It's simple but takes some time to cook.",
        genre: "Cooking"
    }
];

// When the user selects the drop down, different videos should pop up based on their correlated arrays.
// When the genre is cuurently on autoplay, those videos of that genre should autoplay

// let musicVideos[]
// let gamingVideos[]
// let artVideos[]
// let cookingVideos[]

let currentIndex = 0; // Track the current video index
let isAutoplayEnabled = false; // Track if autoplay is on or off

// Function to change the video, update the title, and update the description
function changeVideo(videoIndex) {
    const video = videos[videoIndex];
    const videoContainer = document.querySelector('.video-container');
    const videoDescription = document.getElementById('video-description');
    const videoTitleElement = document.getElementById('video-title');

    // Clear the current video
    videoContainer.innerHTML = '';

    // Create a new iframe for the selected video
    const iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = `${video.link}?autoplay=1&enablejsapi=1`; // Enable autoplay and JS API

    iframe.allowFullscreen = true;
    iframe.setAttribute('title', video.videoTitle);
    iframe.setAttribute('id', 'videoPlayer');

    // Append the new video iframe
    videoContainer.appendChild(iframe);

    // Update the title below the video
    videoTitleElement.textContent = video.videoTitle;

    // Update the description box with the selected video's description
    videoDescription.textContent = video.description;

    // Set up the autoplay listener if autoplay is enabled
    if (isAutoplayEnabled) {
        iframe.addEventListener('load', () => {
            const player = new YT.Player('videoPlayer', {
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        });
    }
}

// Event listener to detect when the video ends
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        playNextVideo();
    }
}

// Function to play the next video in the array
function playNextVideo() {
    currentIndex = (currentIndex + 1) % videos.length; // Move to the next video, loop back to the start if at the end
    changeVideo(currentIndex); // Play the next video
}

// Event listener for the genre dropdown
const genreDropdown = document.getElementById('genreDropdown');
genreDropdown.addEventListener('change', function() {
    const selectedGenre = genreDropdown.value;

    // Find the video that matches the selected genre
    const selectedVideoIndex = videos.findIndex(video => video.genre === selectedGenre);

    // If a matching video is found, change the video
    if (selectedVideoIndex !== -1) {
        currentIndex = selectedVideoIndex;
        changeVideo(currentIndex);
    }
});

// Autoplay toggle button functionality
const autoplayButton = document.getElementById('auto-play');
autoplayButton.addEventListener('click', function () {
    isAutoplayEnabled = !isAutoplayEnabled; // Toggle autoplay state

    if (isAutoplayEnabled) {
        autoplayButton.textContent = 'Autoplay ON';
    } else {
        autoplayButton.textContent = 'Autoplay OFF';
    }
});

// Instagram and Github redirect functions
function instagram() {
    window.open('https://www.instagram.com/jeanbeanbc/', '_blank');
}

function github() {
    window.open('https://github.com/Jenni4B', '_blank');
}
