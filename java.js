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

// Function to change the video, update the title, and update the description
function changeVideo(video) {
    const videoContainer = document.querySelector('.video-container');
    const videoDescription = document.getElementById('video-description');
    const videoTitleElement = document.getElementById('video-title');

    // Clear any previous video
    videoContainer.innerHTML = '';

    // Create a new iframe for the selected video
    const iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = video.link;
    iframe.allowFullscreen = true;
    iframe.setAttribute('title', video.videoTitle);

    // Append the new video iframe
    videoContainer.appendChild(iframe);

    // Update the title below the video
    videoTitleElement.textContent = video.videoTitle;

    // Update the description box with the selected video's description
    videoDescription.textContent = video.description;
}

// Event listener for the genre dropdown
const genreDropdown = document.getElementById('genreDropdown');
genreDropdown.addEventListener('change', function() {
    const selectedGenre = genreDropdown.value;

    // Find the video that matches the selected genre
    const selectedVideo = videos.find(video => video.genre === selectedGenre);

    // If a matching video is found, change the video, title, and description
    if (selectedVideo) {
        changeVideo(selectedVideo);
    }
});

// Instagram and Github redirect functions
function instagram() {
    window.open('https://www.instagram.com/jeanbeanbc/', '_blank');
}

function github() {
    window.open('https://github.com/Jenni4B', '_blank');
}
