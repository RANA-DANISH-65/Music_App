import { sidhu } from "../Songs.js";

const music = new Audio("../SONGS/SIDHU SONGS/1.mp3");
const downloadBtn = document.getElementById("downloadBtn");
const masterPlayBtn = document.getElementById("playBtn");
const waveAnimation = document.querySelector(".wave");
const poster = document.getElementById("poster");

const title = document.getElementById("title");
const shuffleBtn = document.getElementById("shuffle");
const preBtn = document.getElementById("PreBtn");
const nexBtn = document.getElementById("NextBtn");
const SongsLeftArrow = document.getElementById("Songs-leftBtn");
const SongsRightArrow = document.getElementById("Songs-rightBtn");
const popSongsDiv = document.querySelector(".popSongs");
const ArtistLeftBtn = document.getElementById("Artists-leftBtn");
const ArtistRightBtn = document.getElementById("Artists-rightBtn");
const artistsDiv = document.querySelector(".item");
const startTime = document.getElementsByClassName("startTime")[0];
const endTime = document.getElementsByClassName("endTime")[0];
const seekBar = document.getElementById("seek");
const bar2 = document.querySelector(".bar2");
const dot = document.querySelectorAll(".dot")[0];
const volIcon = document.getElementById("Vol-icon");
const volInput = document.getElementById("vol");
const volBar = document.querySelector(".vol-bar");
const volDot = document.getElementById("vol-dot");

const playlistDiv = document.getElementById("playlistDiv");

let currentSongInd = 0;

sidhu.forEach((song, index) => {
  const songDiv = document.createElement("li");
  songDiv.classList.add("songItem");
  if (index <= 8) {
    songDiv.innerHTML = `
    <span>${song.id}</span>
       <img src="${song.cover}" alt=""  />
       <h5>
        ${song.songName}
       </h5>
       <i class="playit fa-regular fa-circle-play" id="${song.id}"></i>
`;
    playlistDiv.appendChild(songDiv);
  } else {
    songDiv.innerHTML=`
         <div class="imgPlay">
                        <img src="${song.cover}" alt="" />
                        <i class="playit fa-solid fa-circle-play" id="${song.id}"></i>
                      </div>
                      <h5>
                        ${song.songName}
                      </h5>
    `
    popSongsDiv.appendChild(songDiv);
  }
});

const playitList = Array.from(document.querySelectorAll(".playit"));
const songItems = Array.from(document.querySelectorAll(".songItem"));

// Play/Pause button event listener
masterPlayBtn.addEventListener("click", () => {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    masterPlayBtn.classList.remove("fa-circle-play");
    masterPlayBtn.classList.add("fa-circle-pause");
    waveAnimation.style.opacity = 1;
  } else {
    music.pause();
    masterPlayBtn.classList.remove("fa-circle-pause");
    masterPlayBtn.classList.add("fa-circle-play");
    waveAnimation.style.opacity = 0;
    makeAllpause();
  }
});

// Change background of song items
const changeBackground = () => {
  songItems.forEach((item) => {
    item.style.background = "rgba(105,105,105,.0)";
  });
};

// Pause all play buttons
const makeAllpause = () => {
  playitList.forEach((el) => {
    el.classList.remove("fa-circle-pause");
    el.classList.add("fa-circle-play");
  });
  waveAnimation.style.opacity = 0;
};

// Play song when a song item is clicked
playitList.forEach((item) => {
  item.addEventListener("click", (el) => {
    currentSongInd = parseInt(el.target.id) - 1;
    masterPlayBtn.classList.remove("fa-circle-play");
    masterPlayBtn.classList.add("fa-circle-pause");
    music.src = sidhu[currentSongInd].songPath;
    music.play();
    poster.src = sidhu[currentSongInd].cover;
    title.innerHTML = sidhu[currentSongInd].songName;
    downloadBtn.href = `${sidhu[currentSongInd].songPath}`;
    downloadBtn.download = title.innerText;
    changeBackground();
    songItems[currentSongInd].style.background = "rgba(105,105,105,.3)";
    makeAllpause();
    el.target.classList.remove("fa-circle-play");
    el.target.classList.add("fa-circle-pause");
    waveAnimation.style.opacity = 1;
  });
});

// Play mode and shuffle button event listener
let playMode = "next";

shuffleBtn.addEventListener("click", () => {
  switch (playMode) {
    case "next":
      shuffleBtn.innerHTML = "repeat";
      playMode = "repeat";
      shuffleBtn.classList.remove("fa-music");
      shuffleBtn.classList.add("fa-repeat");
      shuffleBtn.classList.remove("fa-shuffle");
      break;
    case "repeat":
      shuffleBtn.innerHTML = "shuffle";
      playMode = "shuffle";
      shuffleBtn.classList.remove("fa-music");
      shuffleBtn.classList.remove("fa-repeat");
      shuffleBtn.classList.add("fa-shuffle");
      break;
    case "shuffle":
      shuffleBtn.innerHTML = "next";
      playMode = "next";
      shuffleBtn.classList.add("fa-music");
      shuffleBtn.classList.remove("fa-repeat");
      shuffleBtn.classList.remove("fa-shuffle");
      break;
  }
});


const updateStyling=(currentSongInd)=>{
  music.src = `${sidhu[currentSongInd].songPath}`;
  music.play();
  poster.src = sidhu[currentSongInd].cover;
  title.innerHTML = sidhu[currentSongInd].songName;
  downloadBtn.href = `${sidhu[currentSongInd].songPath}`;
  downloadBtn.download = title.innerText;
  changeBackground();
  songItems[currentSongInd].style.background = "rgba(105,105,105,.3)";
  makeAllpause();
  waveAnimation.style.opacity = 1;
  masterPlayBtn.classList.remove("fa-circle-play");
  masterPlayBtn.classList.add("fa-circle-pause");
  playitList[currentSongInd].classList.remove("fa-circle-play");
  playitList[currentSongInd].classList.add("fa-circle-pause");
}






// Function to check and handle play mode
const CheckPlayMode = () => {
  if (playMode === "repeat") {
    music.currentTime = 0;
    music.play();
    masterPlayBtn.classList.remove("fa-circle-play");
    masterPlayBtn.classList.add("fa-circle-pause");
    playitList[currentSongInd].classList.remove("fa-circle-play");
    playitList[currentSongInd].classList.add("fa-circle-pause");
  } else if (playMode === "shuffle") {
    currentSongInd = Math.floor(Math.random() * sidhu.length);
      updateStyling(currentSongInd);
  } else if (playMode === "next") {
    currentSongInd = (currentSongInd + 1) % sidhu.length;
          updateStyling(currentSongInd);
  }
}

const playPreviousSong = () => {
  if (currentSongInd <= 0) {
    currentSongInd = sidhu.length - 1;
  } else {
    currentSongInd--;
  }
  updateStyling(currentSongInd);
};

;

let searchInput = document.getElementById("searchInput");
let searchResults = document.getElementById("searchResults");
let searchBtn = document.getElementById("searchBtn");

sidhu.forEach((element) => {
  const { id, songName, cover } = element;
  
  let card = document.createElement("a");
  card.classList.add("card");
  card.href = `#${id}`;
  card.innerHTML = `
    <img src="${cover}" alt="">
    <div class="content">${songName}</div>
  `;
  searchResults.appendChild(card);
});

const searchSongs = () => {
  let input = searchInput.value.toUpperCase();
  let items = searchResults.getElementsByTagName("a");
  let hasResults = false;

  if (input.length > 0) {
    for (let i = 0; i < items.length; i++) {
      let as = items[i].getElementsByClassName("content")[0];
      let textValue = as.textContent || as.innerHTML;
      if (textValue.toUpperCase().indexOf(input) > -1) {
        items[i].style.display = "flex";
        hasResults = true;
      } else {
        items[i].style.display = "none";
      }
    }
    searchResults.style.display = hasResults ? "block" : "none";
  } else {
    searchResults.style.display = "none";
  }
};

// Attach the search function to the input event
searchInput.addEventListener("input", searchSongs);

// Hide the search results initially
searchResults.style.display = "none";

// Optional: Attach search function to the search button if needed
searchBtn.addEventListener("click", searchSongs);


// Event listener for song end
music.addEventListener("ended", CheckPlayMode);

// Previous and Next button event listeners
preBtn.addEventListener("click", () => {
  playPreviousSong();
});

nexBtn.addEventListener("click", () => {
  CheckPlayMode();
});

// Scroll buttons event listeners
SongsRightArrow.addEventListener("click", () => {
  popSongsDiv.scrollLeft += 330;
});

SongsLeftArrow.addEventListener("click", () => {
  popSongsDiv.scrollLeft -= 330;
});

ArtistRightBtn.addEventListener("click", () => {
  artistsDiv.scrollLeft += 330;
});

ArtistLeftBtn.addEventListener("click", () => {
  artistsDiv.scrollLeft -= 330;
});

// Music volume control
volInput.addEventListener("change", () => {
  if (volInput.value == 0) {
    volIcon.classList.remove("fa-volume-up");
    volIcon.classList.remove("fa-volume-down");
    volIcon.classList.add("fa-volume-mute");
  } else if (volInput.value > 0 && volInput.value <= 50) {
    volIcon.classList.remove("fa-volume-up");
    volIcon.classList.remove("fa-volume-mute");
    volIcon.classList.add("fa-volume-down");
  } else if (volInput.value > 50) {
    volIcon.classList.remove("fa-volume-down");
    volIcon.classList.remove("fa-volume-mute");
    volIcon.classList.add("fa-volume-up");
  }
  let volA = volInput.value;
  volBar.style.width = `${volA}%`;
  volDot.style.left = `${volA}%`;
  music.volume = volA / 100;
});

// Music time update and seek control
music.addEventListener("timeupdate", () => {
  let music_curr = music.currentTime;
  let music_dur = music.duration;
  let min1 = Math.floor(music_dur / 60);
  let sec1 = Math.floor(music_dur % 60);
  if (sec1 < 10) {
    sec1 = `0${sec1}`;
  }
  endTime.innerText = `${min1}:${sec1}`;
  let min2 = Math.floor(music_curr / 60);
  let sec2 = Math.floor(music_curr % 60);
  if (sec2 < 10) {
    sec2 = `0${sec2}`;
  }
  startTime.innerText = `${min2}:${sec2}`;
  let progressBar = parseInt((music_curr / music_dur) * 100);
  seekBar.value = progressBar;
  bar2.style.width = `${progressBar}%`;
  dot.style.left = `${progressBar}%`;
});

seekBar.addEventListener("change", () => {
  music.currentTime = (seekBar.value * music.duration) / 100;
});
