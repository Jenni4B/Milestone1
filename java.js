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
    },
    {
        link: "https://www.youtube.com/embed/DR26QjyF__g?si=clHjFOKbvUYCq3f6",
        videoTitle: "We'll Be Fine | EPIC: The Musical Animatic",
        description: "The only bad part of the song is that it isn't 5 minutes long.",
        genre: "Animation"
    }
];

let musicVideos = [
    {
        link: "https://www.youtube.com/embed/R1r9nLYcqBU?si=nNSEiL_u-7HRVq50",
        videoTitle: "2-HOUR STUDY WITH ME | Calm Piano ️🎹 Rain sound🌧️ | Pomodoro 50/10 | Rainy Day - Spring 2024 🌸",
        description: "Hi There~ Thank you for joining me today🌧️🥕 If you like this video, you can Like & Subscribe to support my channel. Thank you so much for your support! ^^",
        genre: "Music"
    },
    {
        link: "",
        videoTitle: "",
        description: "",
        genre: ""
    },
    {
        link: "",
        videoTitle: "",
        description: "",
        genre: ""
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
    const videoDescription = document.getElementById('video-description');

    if (player && player.loadVideoById) {
        player.loadVideoById(getVideoIdFromUrl(video.link));
    } else {
        console.error('YouTube player not ready');
    }

    videoTitleElement.textContent = video.videoTitle;
    videoDescription.textContent = video.description;
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED && isAutoplayEnabled) {
        playNextVideo();
    }
}

function playNextVideo() {
    currentIndex = (currentIndex + 1) % videos.length;
    changeVideo(currentIndex);
}

document.addEventListener('DOMContentLoaded', function() {
    const genreDropdown = document.getElementById('genreDropdown');
    genreDropdown.addEventListener('change', function() {
        const selectedGenre = this.value;
        const selectedVideoIndex = videos.findIndex(video => video.genre === selectedGenre);

        if (selectedVideoIndex !== -1) {
            currentIndex = selectedVideoIndex;
            changeVideo(currentIndex);
        }
    });

    const autoplayButton = document.getElementById('autoplayButton');
    autoplayButton.addEventListener('click', function() {
        isAutoplayEnabled = !isAutoplayEnabled;
        this.textContent = isAutoplayEnabled ? 'Autoplay ON' : 'Autoplay OFF';
    });
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
