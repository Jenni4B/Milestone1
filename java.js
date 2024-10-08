let videos = [
    {
        link: "https://www.youtube.com/embed/d2V7x93Kd78?si=mSYbngNrYej8Yciy",
        videoTitle: "You're Lost in a Forgotten Library | Melancholic Piano with Rain | Dark Academia Playlist",
        description: "🎹 Music and art created by Mochi Lofi Cafe",
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
    },
    {
        link: "https://www.youtube.com/embed/DR26QjyF__g?si=clHjFOKbvUYCq3f6",
        videoTitle: "We'll Be Fine | EPIC: The Musical Animatic",
        description: "The only bad part of the song is that it isn't 5 minutes long.",
        genre: "Animation"
    },
    {
        link: "https://www.youtube.com/embed/bWIgy-Ls-SU?si=IzQQ9BdMYNxcNe9h",
        videoTitle: "The Horse and The Infant",
        description: "The Horse and the Infant · Jorge Rivera-Herrans · Luke Holt · Cast of EPIC: The Musical || ℗ Winion Entertainment LLC",
        genre: "Music"
    },
    {
        link: "https://www.youtube.com/embed/WOgxiS33tME?si=Pd2eE8CDyGFbi57k",
        videoTitle: "Ruthlessness | Epic: The Musical Animatic",
        description: "This one took a bit longer than expected but with it being over 1000 frames and having most of the water being animated I think I will let it slide this time! OH, I finally got my new mic in so I can do the how its made videos for these animatics.",
        genre: "Animation"
    }
];

let currentIndex = 0;
let isAutoplayEnabled = false;
let player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('videoPlayer', {
        height: '315',
        width: '560',
        videoId: getVideoIdFromUrl(videos[currentIndex].link),
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function getVideoIdFromUrl(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function changeVideo(videoIndex) {
    const video = videos[videoIndex];
    const videoTitleElement = document.getElementById('video-title');
    const videoContainer = document.querySelector('.video-container');

    // Load the video into the iframe with autoplay flag
    if (player && player.loadVideoById) {
        // Use loadVideoById with autoplay
        player.loadVideoById({
            videoId: getVideoIdFromUrl(video.link),
            startSeconds: 0,
            suggestedQuality: 'default'
        });
    } else {
        // Create an iframe and set the video source with autoplay
        videoContainer.innerHTML = `<iframe id="videoPlayer" width="560" height="315" src="${video.link}?autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        // Reinitialize the player
        onYouTubeIframeAPIReady();
    }

    // Set the title
    videoTitleElement.textContent = video.videoTitle;

    // Update current index
    currentIndex = videoIndex;

    // Update recommended videos based on the current genre
    const genre = video.genre;
    filterAndDisplayRecommendedVideos(genre);

    // Delay description update until the video is loaded
    setTimeout(() => {
        const videoDescription = document.getElementById('video-description');
        videoDescription.textContent = video.description;
    }, 200); // Adjust the timeout as needed
}

function onPlayerStateChange(event) {
    // Check if the video has ended and autoplay is enabled
    if (event.data === YT.PlayerState.ENDED && isAutoplayEnabled) {
        playNextVideo();
    }
}

function playNextVideo() {
    currentIndex = (currentIndex + 1) % videos.length;
    changeVideo(currentIndex);
}

// Filter and display recommended videos excluding the current one
function filterAndDisplayRecommendedVideos(genre) {
    // Filter videos by genre and exclude the currently playing video
    const filteredVideos = videos.filter((video, index) => video.genre === genre && index !== currentIndex);

    // Render the recommended videos
    renderVideos(filteredVideos);
}

// Updated renderVideos function
function renderVideos(filteredVideos) {
    const recommendedVideosContainer = document.getElementById('recommendedVideosContainer');
    recommendedVideosContainer.innerHTML = ""; // Clear previous videos

    if (filteredVideos.length === 0) {
        recommendedVideosContainer.innerHTML = "<p>No videos available for this genre.</p>";
    } else {
        filteredVideos.forEach((video, index) => {
            // Create a clickable div for each video and add the event listener
            const videoDiv = document.createElement('div');
            videoDiv.classList.add('recommended-video');
            videoDiv.setAttribute('data-video-index', videos.indexOf(video));  // Store the index of the video
            videoDiv.innerHTML = `
                <iframe width="280" height="158" src="${video.link}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                <h4>${video.videoTitle}</h4>
                <p>${video.description}</p>
            `;

            // Add the click event listener
            videoDiv.addEventListener('click', function() {
                const videoIndex = parseInt(this.getAttribute('data-video-index'), 10);
                changeVideo(videoIndex); // Update the current video
            });

            // Append each videoDiv to the recommendedVideosContainer
            recommendedVideosContainer.appendChild(videoDiv);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const genreDropdown = document.getElementById('genreDropdown');
    genreDropdown.addEventListener('change', function() {
        const selectedGenre = this.value;

        // If a genre is selected, filter and display the videos for that genre
        if (selectedGenre) {
            filterAndDisplayRecommendedVideos(selectedGenre);
        }
    });

    const autoplayButton = document.getElementById('autoplayButton');
    autoplayButton.addEventListener('click', function() {
        isAutoplayEnabled = !isAutoplayEnabled;
        this.textContent = isAutoplayEnabled ? 'Autoplay ON' : 'Autoplay OFF';
    });

    // Initialize the first video
    changeVideo(currentIndex);
});

function instagram() {
    window.open('https://www.instagram.com/jeanbeanbc/', '_blank');
}

function github() {
    window.open('https://github.com/Jenni4B', '_blank');
}

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
            el.classList.toggle('dark-mode', theme === 'darkMode');
        }
    });
}
