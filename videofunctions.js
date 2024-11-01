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

    // Update current index
    currentIndex = videoIndex;

    // Load the video into the iframe with autoplay if enabled
    if (player && player.loadVideoById) {
        // Autoplay next video if autoplay is enabled
        const autoplayParam = isAutoplayEnabled ? 1 : 0;
        player.loadVideoById({
            videoId: getVideoIdFromUrl(video.link),
            startSeconds: 0,
            suggestedQuality: 'default'
        });
    } else {
        // Create an iframe and set the video source with autoplay flag
        const autoplayFlag = isAutoplayEnabled ? "autoplay=1" : "autoplay=0";
        videoContainer.innerHTML = `<iframe id="videoPlayer" width="560" height="315" src="${video.link}?${autoplayFlag}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        // Reinitialize the player
        onYouTubeIframeAPIReady();
    }

    // Set the title
    videoTitleElement.textContent = video.videoTitle;

    // Delay description update until the video is loaded
    setTimeout(() => {
        const videoDescription = document.getElementById('video-description');
        videoDescription.textContent = video.description;
    }, 200);

    // Update recommended videos based on the current genre
    const genre = video.genre;
    filterAndDisplayRecommendedVideos(genre);
}

function playNextVideo() {
    currentIndex = (currentIndex + 1) % videos.length;
    changeVideo(currentIndex);
}

function onPlayerStateChange(event) {
    // Check if the video has ended and autoplay is enabled
    if (event.data === YT.PlayerState.ENDED && isAutoplayEnabled) {
        playNextVideo();
    }
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

    // If no filteredVideos are provided, load all videos
    if (!filteredVideos || filteredVideos.length === 0) {
        recommendedVideosContainer.innerHTML = "<p>No videos available for this genre. Loading all videos instead.</p>";

        // load all videos in case filteredVideos is empty or not provided
        videos.forEach((video, index) => {

            // Create a clickable div for each video and add the event listener
            const videoDiv = document.createElement('div');
            videoDiv.classList.add('recommended-video');
            videoDiv.setAttribute('data-video-index', index);  // Store the index of the video
            videoDiv.innerHTML = `
                <iframe width="280" height="158" src="${video.link}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                <h4>${video.videoTitle}</h4> `;

            videoDiv.addEventListener('click', function() {
                const videoIndex = parseInt(this.getAttribute('data-video-index'), 10);
                changeVideo(videoIndex); // Update the current video
            });

            // Append each videoDiv to the recommendedVideosContainer
            recommendedVideosContainer.appendChild(videoDiv);
        });

    } else {
        // If filteredVideos are available, load them
        filteredVideos.forEach((video, index) => {

            // Create a clickable div for each video and add the event listener
            const videoDiv = document.createElement('div');
            videoDiv.classList.add('recommended-video');
            videoDiv.setAttribute('data-video-index', videos.indexOf(video));  // Store the index of the video
            videoDiv.innerHTML = `
                <iframe width="280" height="158" src="${video.link}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                <h4>${video.videoTitle}</h4> `;

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
