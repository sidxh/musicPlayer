const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playlistButton = document.getElementById("playlist");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playlistContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playlistSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");

//index for songs
let index;

//initially loop=true
let loop = true;

const songsList = [
  {
    name: "Charlie's Last Letter",
    link: "charlies-last-letter.mp3",
    artist: "Perks Of Being A Wallflower",
    image: "perks.jpg",
  }, 
  {
    name: "Like 1999",
    link: "like-1999.mp3",
    artist: "The Valley",
    image: "like-1999.png",
  },
  {
    name: "Boots Of Spanish Leather",
    link: "boots.mp3",
    artist: "Bob Dylan",
    image: "boots.jpg",
  },
  {
    name: "The Girl In The Car",
    link: "the-girl-in-the-car.mp3",
    artist: "The Lumineers",
    image: "the-girl-in-the-car.jpeg",
  },
  {
    name: "Love Of My Life",
    link: "closer-to-the-picture.mp3",
    artist: "The Queen",
    image: "love-of-my-life.jpg",
  },
  {
    name: "Vienna",
    link: "vienna.mp3",
    artist: "Billy Joel",
    image: "vienna.jpg",
  },
  {
    name: "Light That Never Goes Out",
    link: "there-is-a-light.mp3",
    artist: "The Smiths",
    image: "asleep.jpg",
  },
  {
    name: "Kilby Girl",
    link: "kilby-girl.mp3",
    artist: "The Backseat Lovers",
    image: "kilby-girl.jpeg",
  },
  {
    name: "Sunsetz",
    link: "sunsetz.mp3",
    artist: "Ciggrates After Sex",
    image: "sunsetz.jpg",
  },
  {
    name: "Comfortably Numb",
    link: "comfortably-numb.mp3",
    artist: "Pink Flyod",
    image: "money.jpeg",
  },
  {
    name: "You Give Love A Bad Name",
    link: "you-give-love-a-bad-name.mp3",
    artist: "Bon Jovi",
    image: "you-give-love-a-bad-name.jpg",
  },
  {
    name: "Let Your Heart Hold Fast",
    link: "hearts-hold-fast.mp3",
    artist: "Fort Atlantic",
    image: "himym.jpg",
  },
  {
    name: "Ophelia",
    link: "ophelia.mp3",
    artist: "The Lumineers",
    image: "ophelia.jpg",
  },  
  {
    name: "Eye Of The Tiger",
    link: "eye-of-the-tiger.mp3",
    artist: "Survivors",
    image: "eye-of-the-tiger.jpg",
  },
  {
    name: "Change Of Heart",
    link: "change-of-heart.mp3",
    artist: "The 1975",
    image: "somebody-else.jpg",
  },
  {
    name: "If You Ever Forget",
    link: "if-you-ever-forget.mp3",
    artist: "Isak Danielson",
    image: "if-you-ever.jpg",
  },
  {
    name: "Closer To The Picture",
    link: "closer-to-the-picture.mp3",
    artist: "The Valley",
    image: "closer.jpg",
  },
  {
    name: "Ragged Wood",
    link: "raged-wood.mp3",
    artist: "Fleet Foxes",
    image: "raged-wood.jpg",
  },
  {
    name: "Take On Me",
    link: "take-on-me.mp3",
    artist: "a-ha",
    image: "take-on-me.jpg",
  },
  
];

//events object
let events = {
  mouse: {
    click: "click",
  },
  touch: {
    click: "touchstart",
  },
};

let deviceType = "";

//Detect touch device

const isTouchDevice = () => {
  try {
    //We try to create TouchEvent(it would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

//Format time (convert ms to seconds, minutes and add 0 id less than 10)
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

//set song
const setSong = (arrayIndex) => {
  //this extracts all the variables from the object
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;
  //display duration when metadata loads
  audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
};

//play song
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

//repeat button
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
    console.log("repeat off");
  } else {
    repeatButton.classList.add("active");
    audio.loop = true;
    console.log("repeat on");
  }
});

//Next song
const nextSong = () => {
  //if loop is true then continue in normal order
  if (loop) {
    if (index == songsList.length - 1) {
      //If last song is being played
      index = 0;
    } else {
      index += 1;
    }
    setSong(index);

    playAudio();
  } else {
    //else find a random index and play that song
    let randIndex = Math.floor(Math.random() * songsList.length);
    console.log(randIndex);
    setSong(randIndex);
    playAudio();
  }
};

//pause song
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

//previous song ( you can't go back to a randomly played song)
const previousSong = () => {
  if (index > 0) {
    pauseAudio();
    index -= 1;
  } else {
    //if first song is being played
    index = songsList.length - 1;
  }
  setSong(index);
  playAudio();
};

//next song when current song ends
audio.onended = () => {
  nextSong();
};

//Shuffle songs
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
    console.log("shuffle off");
  } else {
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
progressBar.addEventListener(events[deviceType].click, (event) => {
  //start of progressBar
  let coordStart = progressBar.getBoundingClientRect().left;
  //mouse click position
  let coordEnd = !isTouchDevice() ? event.clientX : event.touches[0].clientX;
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

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
setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
});

//update time
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

//Creates playlist
const initializePlaylist = () => {
  for (let i in songsList) {
    playlistSongs.innerHTML += `<li class='playlistSong' onclick='setSong(${i})'>
            <div class="playlist-image-container">
                <img src="${songsList[i].image}" style="height:5rem;"/>
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                    ${songsList[i].name}
                </span>
                <span id="playlist-song-artist-album">
                    ${songsList[i].artist}
                </span>
            </div>
        </li>`;
  }
};

//display playlist
playlistButton.addEventListener("click", () => {
  playlistContainer.classList.remove("hide");
});

//hide playlist
closeButton.addEventListener("click", () => {
  playlistContainer.classList.add("hide");
});

window.onload = () => {
  //initially first song
  index = 0;
  setSong(index);
  //create playlist
  initializePlaylist();
};