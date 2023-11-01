"use strict";
var prevButton = document.getElementById("prev");
var nextButton = document.getElementById("next");
var repeatButton = document.getElementById("repeat");
var shuffleButton = document.getElementById("shuffle");
var audio = document.getElementById("audio");
var songImage = document.getElementById("song-image");
var songName = document.getElementById("song-name");
var songArtist = document.getElementById("song-artist");
var pauseButton = document.getElementById("pause");
var playButton = document.getElementById("play");
var playlistButton = document.getElementById("playlist");
var maxDuration = document.getElementById("max-duration");
var currentTimeRef = document.getElementById("current-time");
var progressBar = document.getElementById("progress-bar");
var playlistContainer = document.getElementById("playlist-container");
var closeButton = document.getElementById("close-button");
var playlistSongs = document.getElementById("playlist-songs");
var currentProgress = document.getElementById("current-progress");
//index for songs
var index;
//initially loop=true
var loop = true;
function loadImage(img) {
    var actualSrc = img.getAttribute("data-src");
    img.setAttribute("src", actualSrc);
}
var songsList = [
    {
        name: "Charlie's Last Letter",
        link: "tracks/charlies-last-letter.mp3",
        artist: "Perks Of Being A Wallflower",
        image: "covers/perks.jpg",
    },
    {
        name: "Like 1999",
        link: "tracks/like-1999.mp3",
        artist: "The Valley",
        image: "covers/like-1999.png",
    },
    {
        name: "Boots Of Spanish Leather",
        link: "tracks/boots.mp3",
        artist: "Bob Dylan",
        image: "covers/boots.jpg",
    },
    {
        name: "The Girl In The Car",
        link: "tracks/the-girl-in-the-car.mp3",
        artist: "August Kamp",
        image: "covers/the-girl-in-the-car.jpeg",
    },
    {
        name: "Love Of My Life",
        link: "tracks/love-of-my-life.mp3",
        artist: "Queen",
        image: "covers/love-of-my-life.jpg",
    },
    {
        name: "Vienna",
        link: "tracks/vienna.mp3",
        artist: "Billy Joel",
        image: "covers/vienna.jpg",
    },
    {
        name: "Light That Never Goes Out",
        link: "tracks/there-is-a-light.mp3",
        artist: "The Smiths",
        image: "covers/asleep.jpg",
    },
    {
        name: "Kilby Girl",
        link: "tracks/kilby-girl.mp3",
        artist: "The Backseat Lovers",
        image: "covers/kilby-girl.jpeg",
    },
    {
        name: "Sunsetz",
        link: "tracks/sunsetz.mp3",
        artist: "Ciggrates After Sex",
        image: "covers/sunsetz.jpg",
    },
    {
        name: "Comfortably Numb",
        link: "tracks/comfortably-numb.mp3",
        artist: "Pink Flyod",
        image: "covers/money.jpeg",
    },
    {
        name: "You Give Love A Bad Name",
        link: "tracks/you-give-love-a-bad-name.mp3",
        artist: "Bon Jovi",
        image: "covers/you-give-love-a-bad-name.jpg",
    },
    {
        name: "Let Your Heart Hold Fast",
        link: "tracks/hearts-hold-fast.mp3",
        artist: "Fort Atlantic",
        image: "covers/himym.jpg",
    },
    {
        name: "Ophelia",
        link: "tracks/ophelia.mp3",
        artist: "The Lumineers",
        image: "covers/ophelia.jpg",
    },
    {
        name: "Eye Of The Tiger",
        link: "tracks/eye-of-the-tiger.mp3",
        artist: "Survivors",
        image: "covers/eye-of-the-tiger.jpg",
    },
    {
        name: "Change Of Heart",
        link: "tracks/change-of-heart.mp3",
        artist: "The 1975",
        image: "covers/somebody-else.jpg",
    },
    {
        name: "If You Ever Forget",
        link: "tracks/if-you-ever-forget.mp3",
        artist: "Isak Danielson",
        image: "covers/if-you-ever.jpg",
    },
    {
        name: "Closer To The Picture",
        link: "tracks/closer-to-the-picture.mp3",
        artist: "The Valley",
        image: "covers/closer.jpg",
    },
    {
        name: "Ragged Wood",
        link: "tracks/raged-wood.mp3",
        artist: "Fleet Foxes",
        image: "covers/raged-wood.jpg",
    },
    {
        name: "Take On Me",
        link: "tracks/take-on-me.mp3",
        artist: "a-ha",
        image: "covers/take-on-me.jpg",
    },
];
// events object
var events = {
    mouse: {
        click: "click",
    },
    touch: {
        click: "touchstart",
    },
};
var deviceType = "";
//Detect touch device
var isTouchDevice = function () {
    try {
        //We try to create TouchEvent(it would fail for desktops and throw error)
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    }
    catch (e) {
        deviceType = "mouse";
        return false;
    }
};
//Format time (convert ms to seconds, minutes and add 0 id less than 10)
var timeFormatter = function (timeInput) {
    var minutes = Math.floor(timeInput / 60);
    var seconds = Math.floor(timeInput % 60);
    var formattedMinutes = minutes < 10 ? "0".concat(minutes) : "".concat(minutes);
    var formattedSeconds = seconds < 10 ? "0".concat(seconds) : "".concat(seconds);
    return "".concat(formattedMinutes, ":").concat(formattedSeconds);
};
//set song
var setSong = function (arrayIndex) {
    //this extracts all the variables from the object
    var _a = songsList[arrayIndex], name = _a.name, link = _a.link, artist = _a.artist, image = _a.image;
    audio.src = link;
    songName.innerHTML = name;
    songArtist.innerHTML = artist;
    songImage.src = image;
    //display duration when metadata loads
    audio.onloadedmetadata = function () {
        maxDuration.innerText = timeFormatter(audio.duration);
    };
};
//play song
var playAudio = function () {
    audio.play();
    pauseButton.classList.remove("hide");
    playButton.classList.add("hide");
};
// Adding the Spacebar-Pause functionality
if (audio) {
    window.addEventListener('keydown', function (event) {
        var key = event.which || event.keyCode;
        if (key === 32) { // space
            event.preventDefault();
            if (audio.paused) {
                audio.play();
                pauseButton.classList.remove("hide");
                playButton.classList.add("hide");
            }
            else {
                audio.pause();
                pauseButton.classList.add("hide");
                playButton.classList.remove("hide");
            }
        }
        else if (key == 37) { // left arrow
            event.preventDefault();
            audio.currentTime = audio.currentTime - 10;
        }
        else if (key == 39) { // right arrow
            event.preventDefault();
            audio.currentTime = audio.currentTime + 10;
        }
        else if (key == 38) {
            nextSong();
        }
        else if (key == 40) {
            previousSong();
        }
    });
}
//repeat button
repeatButton.addEventListener("click", function () {
    if (repeatButton.classList.contains("active")) {
        repeatButton.classList.remove("active");
        audio.loop = false;
        console.log("repeat off");
    }
    else {
        repeatButton.classList.add("active");
        audio.loop = true;
        console.log("repeat on");
    }
});
//Next song
var nextSong = function () {
    //if loop is true then continue in normal order
    if (loop) {
        if (index == songsList.length - 1) {
            //If last song is being played
            index = 0;
        }
        else {
            index += 1;
        }
        setSong(index);
        playAudio();
    }
    else {
        //else find a random index and play that song
        var randIndex = Math.floor(Math.random() * songsList.length);
        console.log(randIndex);
        setSong(randIndex);
        playAudio();
    }
};
//pause song
var pauseAudio = function () {
    audio.pause();
    pauseButton.classList.add("hide");
    playButton.classList.remove("hide");
};
//previous song ( you can't go back to a randomly played song)
var previousSong = function () {
    if (index > 0) {
        pauseAudio();
        index -= 1;
    }
    else {
        //if first song is being played
        index = songsList.length - 1;
    }
    setSong(index);
    playAudio();
};
//next song when current song ends
audio.onended = function () {
    nextSong();
};
//Shuffle songs
shuffleButton.addEventListener("click", function () {
    if (shuffleButton.classList.contains("active")) {
        shuffleButton.classList.remove("active");
        loop = true;
        console.log("shuffle off");
    }
    else {
        shuffleButton.classList.add("active");
        loop = false;
        console.log("shuffle on");
    }
});
//play button
playButton.addEventListener("click", playAudio);
//next button
nextButton.addEventListener("click", nextSong);
//pause button
pauseButton.addEventListener("click", pauseAudio);
//prev button
prevButton.addEventListener("click", previousSong);
//if user clicks on progress bar
isTouchDevice();
progressBar.addEventListener(events[deviceType].click, function (event) {
    //start of progressBar
    var coordStart = progressBar.getBoundingClientRect().left;
    //mouse click position
    var coordEnd = !isTouchDevice() ? event.clientX : event.touches[0].clientX;
    var progress = (coordEnd - coordStart) / progressBar.offsetWidth;
    //set width to progress
    currentProgress.style.width = progress * 100 + "%";
    //set time
    audio.currentTime = progress * audio.duration;
    //play
    audio.play();
    pauseButton.classList.remove("hide");
    playButton.classList.add("hide");
});
//update progress every second
setInterval(function () {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
    currentProgress.style.width =
        (audio.currentTime / parseFloat(audio.duration.toFixed(3))) * 100 + "%";
});
//update time
audio.addEventListener("timeupdate", function () {
    currentTimeRef.innerText = timeFormatter(audio.currentTime);
});
//Creates playlist
var initializePlaylist = function () {
    for (var i in songsList) {
        playlistSongs.innerHTML += "<li class='playlistSong' onclick='setSong(".concat(i, ")'>\n            <div class=\"playlist-image-container\">\n                <img src=\"").concat(songsList[i].image, "\" style=\"height:5rem;\"/>\n            </div>\n            <div class=\"playlist-song-details\">\n                <span id=\"playlist-song-name\">\n                    ").concat(songsList[i].name, "\n                </span>\n                <span id=\"playlist-song-artist-album\">\n                    ").concat(songsList[i].artist, "\n                </span>\n            </div>\n        </li>");
    }
};
//display playlist
playlistButton.addEventListener("click", function () {
    playlistContainer.classList.remove("hide");
});
//hide playlist
closeButton.addEventListener("click", function () {
    playlistContainer.classList.add("hide");
});
window.onload = function () {
    //initially first song
    index = 0;
    setSong(index);
    //create playlist
    initializePlaylist();
};
